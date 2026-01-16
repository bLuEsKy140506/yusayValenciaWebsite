import { Phone, Mail, FacebookIcon } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* 🌿 Logo and About */}
        <div>
          <h2 className="text-2xl font-extrabold text-green-500 mb-3">
            YCFC - Valencia Branch
          </h2>
          <p className="text-sm leading-relaxed">
            Fast, personal, and community-focused financial solutions.
          </p>
        </div>

        {/* ☎️ Contact Section */}
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
              {/* 💬 Messenger Link */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline w-4 h-4 mr-2 text-green-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.075 2 11.12c0 2.856 1.433 5.416 3.74 7.11V22l3.427-1.879c.912.253 1.885.39 2.89.39 5.523 0 10-4.075 10-9.12S17.523 2 12 2zm.48 12.764l-2.627-2.796-4.019 2.796 4.694-5.107 2.598 2.796 4.049-2.796-4.695 5.107z" />
              </svg>
              <a
                href="https://m.me/109116028169824"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                Message us on Messenger
              </a>
            </li>
          </ul>
        </div>

        {/*🧰 Private Tools */}
         <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Private Tools
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
               <HashLink smooth to="/calculator" className="hover:text-green-700">
                Loan Calculator
              </HashLink>
             
            </li> 
            <li>
               <HashLink smooth to="/pdi-calculator" className="hover:text-green-700">
                PDI Calculator
              </HashLink>
             
            </li> 
             {/* <li>
              <a href="#" className="hover:text-green-400 transition">
                Company Manual
              </a>
            </li>  */}
             <li>
               <HashLink smooth to="/history" className="hover:text-green-700">
                History
              </HashLink>
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
        © {new Date().getFullYear()} Yusay Credit & Finance Corporation –
        Valencia Branch.{" "}
        <span className="block md:inline">All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
