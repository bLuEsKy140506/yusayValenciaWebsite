import { Phone, Mail, FacebookIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🌿 Logo and About */}
        <div>
          <h2 className="text-2xl font-extrabold text-green-500 mb-3">YCFC - Valencia Branch</h2>
          <p className="text-sm leading-relaxed">
            Fast, personal, and community-focused financial solutions.
          </p>
        </div>

        {/* ☎️ Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Phone className="inline w-4 h-4 mr-2 text-green-400" />
              (088) 828-4163
            </li>
            <li>
              <Phone className="inline w-4 h-4 mr-2 text-green-400" />
              0926-143-793 / 0917-180-8551
            </li>
            <li>
              <Mail className="inline w-4 h-4 mr-2 text-green-400" />
              <a
                href="mailto:valencia@ycfc.com.ph"
                className="hover:text-green-400 transition"
              >
                valencia@ycfc.com.ph
              </a>
            </li>
            <li>
              <FacebookIcon className="inline w-4 h-4 mr-2 text-green-400" />
              <a
                href="https://www.facebook.com/profile.php?id=100072334374737"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                YCFC Valencia Branch
              </a>
            </li>
          </ul>
        </div>

        {/* 🧰 Private Tools */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Private Tools</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                PDI Calculator
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Company Manual
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                History
              </a>
            </li>
          </ul>
        </div>

        {/* 📱 Social / Extra */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <a
            href="https://www.facebook.com/profile.php?id=100072334374737"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-green-400 transition"
          >
            <FacebookIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            <span>Facebook</span>
          </a>
        </div>
      </div>

      {/* ⚙️ Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Yusay Credit & Finance Corporation – Valencia Branch.{" "}
        <span className="block md:inline">All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
