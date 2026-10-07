import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./kinetic-navigation.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("glemm-menu", "0.65, 0.01, 0.05, 0.99");
}

export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

type Props = {
  links: NavigationLink[];
  photos: string[];
  onOpenChange: (open: boolean) => void;
};

export default function KineticNavigation({ links, photos, onOpenChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const basePhoto = useRef(-1);
  const activeLink = useRef(0);
  const pendingAnchor = useRef("");
  const hasOpened = useRef(false);
  const openRef = useRef(false);
  const visibleRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  openRef.current = isMenuOpen;
  visibleRef.current = isVisible;

  const finishClose = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.display = "none";
    setIsVisible(false);
    onOpenChange(false);
  }, [onOpenChange]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const context = gsap.context(() => {
      const panels = container.querySelectorAll(".backdrop-layer");
      const menuLinks = container.querySelectorAll(".nav-link");
      gsap.set(panels, { xPercent: 101 });
      gsap.set(menuLinks, { yPercent: 140, rotation: 10 });
      gsap.set(".menu-overlay, .ambient-background-photos", { autoAlpha: 0 });
      timeline.current = gsap.timeline({
        paused: true,
        defaults: { ease: "glemm-menu" },
        onComplete: () => {
          if (openRef.current) {
            container.querySelectorAll<HTMLAnchorElement>(".nav-link")[activeLink.current]?.focus({ preventScroll: true });
          }
        },
        onReverseComplete: finishClose,
      })
        .to(".menu-button-text > span", { yPercent: -100, duration: 0.45 }, 0)
        .to(".menu-button-icon", { rotation: 315, duration: 0.45 }, 0)
        .to(".menu-overlay", { autoAlpha: 1, duration: 0.35 }, 0)
        .to(panels, { xPercent: 0, duration: 0.575, stagger: 0.1 }, 0)
        .to(menuLinks, { yPercent: 0, rotation: 0, duration: 0.6, stagger: 0.05 }, 0.3)
        .to(".ambient-background-photos", { autoAlpha: 1, duration: 0.35 }, 0.35);
    }, container);
    return () => {
      context.revert();
      timeline.current = null;
    };
  }, [links.length, finishClose]);

  useLayoutEffect(() => {
    const animation = timeline.current;
    if (!animation || !isVisible) return;
    if (overlayRef.current) overlayRef.current.style.display = "block";
    if (reducedMotion) {
      animation.pause().progress(isMenuOpen ? 1 : 0);
      if (!isMenuOpen) finishClose();
    } else if (isMenuOpen) {
      animation.timeScale(1).play();
    } else if (animation.time() === 0) {
      finishClose();
    } else {
      animation.timeScale(1.5).reverse();
    }
  }, [isMenuOpen, isVisible, reducedMotion, finishClose]);

  useEffect(() => {
    if (!isVisible) {
      if (!hasOpened.current) return;
      const frame = requestAnimationFrame(() => {
        if (visibleRef.current) return;
        const anchor = pendingAnchor.current;
        pendingAnchor.current = "";
        if (anchor) {
          const target = document.getElementById(anchor.slice(1));
          if (target) {
            window.location.hash = anchor;
            target.scrollIntoView({ block: "start", behavior: "auto" });
            target.focus({ preventScroll: true });
          }
        } else {
          buttonRef.current?.focus({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    const rootOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") || [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isVisible, closeMenu]);

  useEffect(() => {
    if (!isVisible) return;
    const images = containerRef.current?.querySelectorAll(".menu-background-photo");
    if (!images?.length) return;
    const tween = gsap.to(images, {
      opacity: (index: number) => index === activePhoto ? 0.13 : 0,
      scale: (index: number) => index === activePhoto ? 1 : 1.035,
      duration: reducedMotion ? 0 : 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
    return () => { tween.kill(); };
  }, [activePhoto, isVisible, reducedMotion, photos.length]);

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
      return;
    }
    pendingAnchor.current = "";
    activeLink.current = 0;
    basePhoto.current = (basePhoto.current + 1) % Math.max(1, photos.length);
    setActivePhoto(basePhoto.current);
    hasOpened.current = true;
    setIsVisible(true);
    setIsMenuOpen(true);
    onOpenChange(true);
  }

  function showPhoto(index: number) {
    activeLink.current = index;
    setActivePhoto((basePhoto.current + index) % Math.max(1, photos.length));
  }

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isVisible) return;
    if (href.startsWith("#")) {
      event.preventDefault();
      pendingAnchor.current = href;
    }
    closeMenu();
  }

  return (
    <div
      ref={containerRef}
      className="kinetic-navigation"
      data-menu-visible={isVisible}
      role={isVisible ? "dialog" : undefined}
      aria-modal={isVisible || undefined}
      aria-label={isVisible ? "Navigatiemenu" : undefined}
    >
      <div className="site-header-wrapper">
        <header className="header">
            <button
              ref={buttonRef}
              className="nav-close-btn"
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
              onClick={toggleMenu}
            >
              <span className="menu-button-text" aria-hidden="true">
                <span>Menu</span>
                <span>Sluiten</span>
              </span>
              <Plus size={20} className="menu-button-icon" aria-hidden="true" />
            </button>
        </header>
      </div>

      <div
        ref={overlayRef}
        className="nav-overlay-wrapper"
        data-nav={isMenuOpen ? "open" : isVisible ? "closing" : "closed"}
        aria-hidden={!isVisible}
      >
        <div className="menu-overlay" onClick={closeMenu} aria-hidden="true" />
        <nav id="main-navigation" className="menu-content" aria-label="Hoofdnavigatie">
          <div className="menu-bg" aria-hidden="true">
            <div className="backdrop-layer first" />
            <div className="backdrop-layer second" />
            <div className="backdrop-layer" />
            <div className="ambient-background-photos">
              {isVisible && photos.map((src, index) => (
                <img
                  key={src}
                  className="menu-background-photo"
                  src={src}
                  alt=""
                  data-photo={index}
                  decoding="async"
                />
              ))}
            </div>
          </div>
          <div className="menu-content-wrapper">
            <ul className="menu-list">
              {links.map((link, index) => (
                <li className="menu-list-item" key={link.href} onMouseEnter={() => showPhoto(index)}>
                  <a
                    className="nav-link"
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onFocus={() => showPhoto(index)}
                    onClick={(event) => navigate(event, link.href)}
                  >
                    <p className="nav-link-text">{link.label}</p>
                    <ArrowUpRight size={34} aria-hidden="true" />
                    <span className="nav-link-hover-bg" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
