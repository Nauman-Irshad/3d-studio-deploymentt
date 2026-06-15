import { useState, type ReactNode } from "react";

import { websitePath } from "../constants/websiteUrls";
import { loginUrl, signupUrl } from "../services/auth";
import { STUDIO_3D_PATH, TRYON_2D_LADIES_PATH } from "../constants/studioUrls";
import { Studio3DNavButton, TryOn2DNavButton } from "../components/ui/FancyButtons";
import { BrandLogo3D } from "../components/ui/BrandLogo3D";

import { useHeaderRoute } from "../hooks/useHeaderRoute";



function SmartFitaoLogo({ size = 42 }: { size?: number }) {

  return <BrandLogo3D size={size} />;

}



const NAV_ITEMS = [

  { label: "Men's Try-On", href: "/" },

  { label: "Women's Try-On", href: "/ladies_try_on/" },

] as const;



export function SiteHeader({

  brandHref = "/ladies_try_on/",

  extraActions = null,

}: {

  brandHref?: string;

  extraActions?: ReactNode;

} = {}) {

  const [menuOpen, setMenuOpen] = useState(false);

  const { onStudioPage, on2dTryOnPage } = useHeaderRoute();
  const hideAuth = onStudioPage || on2dTryOnPage;

  const closeMenu = () => setMenuOpen(false);



  return (

    <header className="tk-header">

      <div className="tk-header-bar">

        <a className="tk-brand" href={brandHref} onClick={closeMenu}>

          <SmartFitaoLogo size={42} />

          <span className="tk-brand-text">

            <span className="tk-brand-name">SmartFitao AI</span>

            <span className="tk-brand-tag">Virtual Try-On</span>

          </span>

        </a>



        <button

          type="button"

          className="tk-menu-toggle"

          aria-expanded={menuOpen}

          aria-controls="tk-main-nav"

          aria-label={menuOpen ? "Close menu" : "Open menu"}

          onClick={() => setMenuOpen((open) => !open)}

        >

          <span className="tk-menu-bar" />

          <span className="tk-menu-bar" />

          <span className="tk-menu-bar" />

        </button>



        <nav id="tk-main-nav" className={`tk-nav${menuOpen ? " is-open" : ""}`} aria-label="Main">

          {NAV_ITEMS.map((item) => (

            <a key={item.label} className="tk-nav-link" href={item.href} onClick={closeMenu}>

              {item.label}

            </a>

          ))}

          <TryOn2DNavButton

            href={TRYON_2D_LADIES_PATH}

            active={on2dTryOnPage}

            prominent={onStudioPage}

            className="ui-space-btn-wrap--nav"

            onClick={closeMenu}

          >

            2D Try-On

          </TryOn2DNavButton>

          <Studio3DNavButton

            href={STUDIO_3D_PATH}

            active={onStudioPage}

            className="ui-space-btn-wrap--nav"

            onClick={closeMenu}

          >

            3D Studio

          </Studio3DNavButton>

          {!hideAuth ? (
            <div className="tk-nav-mobile-auth">
              <a className="tk-signin-link" href={loginUrl()} onClick={closeMenu}>
                Sign in
              </a>
              <a className="tk-signup-btn" href={signupUrl()} onClick={closeMenu}>
                Sign up
              </a>
            </div>
          ) : null}

        </nav>



        <div className="tk-header-actions">

          <TryOn2DNavButton

            href={TRYON_2D_LADIES_PATH}

            active={on2dTryOnPage}

            prominent={onStudioPage}

            title="AI 2D virtual try-on"

          >

            2D Try-On

          </TryOn2DNavButton>

          <Studio3DNavButton href={STUDIO_3D_PATH} active={onStudioPage} title="View all products in 3D">

            3D Studio

          </Studio3DNavButton>

          {!hideAuth ? (
            <>
              <a className="tk-signin-link" href={loginUrl()}>
                Sign in
              </a>
              <a className="tk-signup-btn" href={signupUrl()}>
                Sign up
              </a>
            </>
          ) : null}

          {extraActions}

        </div>

      </div>

      {menuOpen ? (

        <button type="button" className="tk-nav-backdrop" aria-label="Close menu" onClick={closeMenu} />

      ) : null}

    </header>

  );

}



export function SiteFooter() {

  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });



  return (

    <footer className="tk-footer">

      <button type="button" className="tk-back-to-top" onClick={scrollTop}>

        Back to top

      </button>



      <div className="tk-footer-main">

        <div className="tk-footer-grid">

          <div className="tk-footer-col">

            <h4 className="tk-footer-heading">Get to Know SmartFitao AI</h4>

            <ul className="tk-footer-links">

              <li><span>About SmartFitao AI</span></li>

              <li><span>How virtual try-on works</span></li>

              <li><span>Photo upload tips</span></li>

              <li><a href={websitePath("/")}>Visit main website</a></li>

            </ul>

          </div>



          <div className="tk-footer-col">

            <h4 className="tk-footer-heading">Try-On</h4>

            <ul className="tk-footer-links">

              <li><a href="/">Men&apos;s kurta try-on</a></li>

              <li><a href="/ladies_try_on/">Women&apos;s kurti try-on</a></li>

              <li><a href={STUDIO_3D_PATH}>3D garment studio</a></li>

              <li><a href={websitePath("/discovery")}>Find a tailor</a></li>

            </ul>

          </div>



          <div className="tk-footer-col">

            <h4 className="tk-footer-heading">Your Account</h4>

            <ul className="tk-footer-links">

              <li><a href={loginUrl()}>Sign in</a></li>

              <li><a href={signupUrl()}>Create account</a></li>

              <li><a href={websitePath("/user/orders")}>Your orders</a></li>

              <li><a href={websitePath("/profile")}>Your profile</a></li>

            </ul>

          </div>



          <div className="tk-footer-col">

            <h4 className="tk-footer-heading">Help &amp; Info</h4>

            <ul className="tk-footer-links">

              <li><span>Help centre</span></li>

              <li><span>AI try-on FAQ</span></li>

              <li><span>Privacy notice</span></li>

            </ul>

          </div>

        </div>

      </div>



      <div className="tk-footer-bottom">

        <div className="tk-footer-bottom-inner">

          <a className="tk-footer-logo" href="/ladies_try_on/">

            <SmartFitaoLogo size={32} />

            <span>SmartFitao AI</span>

          </a>

          <div className="tk-footer-legal">

            <span>Conditions of Use</span>

            <span>Privacy Notice</span>

            <span>Help</span>

          </div>

          <p className="tk-footer-copy">© {year}, SmartFitao AI</p>

        </div>

      </div>

    </footer>

  );

}


