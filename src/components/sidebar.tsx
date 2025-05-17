"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface SidebarLink {
  icon?: string;
  text?: string;
  href?: string;
  show?: boolean;
  className?: string;
  onClick?: () => void;
  render?: () => React.ReactNode;
}

interface SidebarProps {
  id: string;
  userName?: string;
  userRole?: string;
  logoSrc?: string;
  appTitle?: string;
  links: SidebarLink[];
}

export default function Sidebar({
  userName = "Usuario",
  userRole = "Administrador",
  logoSrc = "/unam.png",
  appTitle = "Sistema de -------",
  links,
  id,
}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = localStorage.getItem(id) === "true";
    setIsOpen(open);
  }, [id]);

  const toggleSidebar = () => {
    localStorage.setItem(id, `${!isOpen}`);
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "close"}`}>
      {/* Header for mobile */}
      <div className="d-flex justify-content-between align-items-center p-2 d-lg-none">
        <h1 className="h3 m-0">{appTitle}</h1>
        <button
          type="button"
          className="m-0 p-0 border-0 bg-transparent"
          data-bs-toggle="offcanvas"
          data-bs-target={`#${id}-offcanvas`}
          aria-controls={`${id}-offcanvas`}
        >
          <i className="bi bi-list fs-2"></i>
        </button>
      </div>

      <div
        className="offcanvas-lg offcanvas-end"
        tabIndex={-1}
        id={`${id}-offcanvas`}
        aria-labelledby={`${id}-offcanvas-label`}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${id}-offcanvas-label`}>
            {appTitle}
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target={`#${id}-offcanvas`}
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body position-relative">
          {/* Toggle sidebar button */}
          <div
            className="d-none d-lg-flex position-absolute"
            style={{ top: "0", right: "-2rem" }}
          >
            <button
              className="bg-white border-0 shadow-sm px-2 py-1"
              type="button"
              onClick={toggleSidebar}
            >
              <i
                className={`bi bi-layout-sidebar-${
                  isOpen ? "inset" : "inset-reverse"
                } text-muted`}
              ></i>
            </button>
          </div>

          <div>
            {/* User Info */}
            <div className="d-flex align-items-center gap-3 my-2">
              <Image src={logoSrc} width={40} height={40} alt="Logo" />
              <div className="nav-link">
                <span>
                  <b>{userName}</b>
                  <br />
                  <p className="text-muted m-0">{userRole}</p>
                </span>
              </div>
            </div>

            <hr />

            <ul className="nav flex-column gap-2">
              {links
                .filter((link) => link.show !== false)
                .map((link, index) => {
                  if (link.render) {
                    return (
                      <React.Fragment key={index}>
                        {link.render()}
                      </React.Fragment>
                    );
                  }

                  const isActive =
                    !!link.href &&
                    (pathname === link.href ||
                      (pathname?.startsWith(link.href) && link.href !== "/u"));

                  const baseClass = `nav-item ${isActive ? "active" : ""} ${
                    link.className || ""
                  }`;

                  return (
                    <li
                      key={index}
                      className={baseClass}
                      data-tooltip={link.text}
                      data-bs-dismiss="offcanvas"
                      data-bs-target="#offcanvasResponsive"
                      aria-label="Close"
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="nav-link"
                          onClick={link.onClick}
                        >
                          {link.icon && <i className={`bi ${link.icon}`}></i>}
                          <span>{link.text}</span>
                        </Link>
                      ) : (
                        <button
                          className="nav-link w-100 text-start"
                          onClick={link.onClick}
                        >
                          {link.icon && <i className={`bi ${link.icon}`}></i>}
                          <span>{link.text}</span>
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
