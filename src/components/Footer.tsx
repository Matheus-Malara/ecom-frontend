import { Facebook, Instagram, Mail, Phone } from "lucide-react"

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
                        <li><a href="#highlights">Highlights</a></li>
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#benefits">Benefits</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Contact</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><Phone size={16} /> (11) 99999-9999</li>
                        <li className="flex items-center gap-2"><Mail size={16} /> support@megasupps.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-3">Follow Us</h4>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Instagram"><Instagram className="hover:text-yellow-400" /></a>
                        <a href="#" aria-label="Facebook"><Facebook className="hover:text-yellow-400" /></a>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-8">
                &copy; {new Date().getFullYear()} MEGA SUPPS. All rights reserved.
            </div>
        </footer>
    )
}
