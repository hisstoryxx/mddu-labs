import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-yonsei-dark text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">MDDU Lab</h3>
            <p className="text-sm leading-relaxed">
              Medical Device Design & Usability Lab
              <br />
              의료기기 설계 및 사용적합성 연구실
            </p>
            <p className="text-sm mt-2">
              연세대학교 의과대학 대학원
              <br />
              의료기기산업학과
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/members", label: "Members" },
                { href: "/research", label: "Research" },
                { href: "/publications", label: "Publications" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-sm leading-relaxed">
              B1, 20, Eonju-ro 63-gil,
              <br />
              Gangnam-gu, Seoul, Korea
            </p>
            <p className="text-sm mt-2">mddu.lab.yonsei@gmail.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} MDDU Lab, Yonsei University. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
