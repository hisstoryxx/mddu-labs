import type { Metadata } from "next";
import PageTransition from "@/app/components/ui/PageTransition";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Card from "@/app/components/ui/Card";
import {
  MapPin,
  Mail,
  Search,
  GraduationCap,
  Phone,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "MDDU Lab 연락처 및 위치",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle title="Contact" subtitle="연락처 및 위치" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden h-[400px] bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.148!2d127.0381!3d37.5105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca40000000000%3A0x0!2z6rCV64Ko6rWsIOyWuOyjvOuhnCA2M-q4uCAyMA!5e0!3m2!1sko!2skr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MDDU Lab 위치"
            />
          </div>

          <div className="space-y-4">
            <Card hover={false}>
              <div className="p-5 flex gap-4">
                <MapPin className="w-5 h-5 text-yonsei-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Address
                  </h3>
                  <p className="text-sm text-text-secondary">
                    B1, 20, Eonju-ro 63-gil, Gangnam-gu, Seoul, Republic of
                    Korea
                  </p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="p-5 flex gap-4">
                <Mail className="w-5 h-5 text-yonsei-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Email
                  </h3>
                  <p className="text-sm text-text-secondary">
                    mddu.lab.yonsei@gmail.com
                  </p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="p-5 flex gap-4">
                <Phone className="w-5 h-5 text-yonsei-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Tel
                  </h3>
                  <p className="text-sm text-text-secondary">02-2019-5442</p>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="p-5 flex gap-4">
                <Search className="w-5 h-5 text-yonsei-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Application
                  </h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>Interns - Opening per semester</li>
                    <li>Graduate students - Contact us</li>
                    <li>Requirements - CV & Academic Record (recommended)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="p-5 flex gap-4">
                <GraduationCap className="w-5 h-5 text-yonsei-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    Department
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Dept. of Medical Device Engineering & Management
                  </p>
                  <a
                    href="http://mdi.yonsei.ac.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-1"
                  >
                    mdi.yonsei.ac.kr
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
