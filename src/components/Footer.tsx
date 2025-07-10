import {Phone, Mail} from "lucide-react";
import {siInstagram, siFacebook} from "simple-icons/icons";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-12 py-10 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h4 className="font-bold text-lg mb-3">MEGA SUPPS</h4>
                    <p>Top quality supplements to boost your performance.</p>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Navigation</h4>
                    <ul className="space-y-2">
                        <li><a href="/">Home</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Contact</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><Phone size={16}/> (11) 99999-9999</li>
                        <li className="flex items-center gap-2"><Mail size={16}/> support@megasupps.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className="hover:text-yellow-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-current text-white hover:text-yellow-400"
                            >
                                <path d={siInstagram.path}/>
                            </svg>
                        </a>
                        <a
                            href="https://facebook.com"
                            aria-label="Facebook"
                            className="hover:text-yellow-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-current text-white hover:text-yellow-400"
                            >
                                <path d={siFacebook.path}/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-8">
                &copy; {new Date().getFullYear()} MEGA SUPPS. All rights reserved.
            </div>
        </footer>
    );
}
