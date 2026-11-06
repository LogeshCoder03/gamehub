import { Link } from "react-router";

export default function Footer() {
    const yours=[
        {
            id:1,
            title:"Dashboard",
            url:"/dashboard"
        },
        {
            id:2,
            title:"API-Keys",
            url:"/api-keys"
        },
        {
            id:3,
            title:"Logout",
            url:"/logout"
        },
    ]
    const quickLinks=[
        {
            id:1,
            title:"Explore Games",
            url:"/games"
        },
        {
            id:2,
            title:"Documentation",
            url:"/docs/overview"
        },
    ]
    return (
        <footer className="w-full py-14 absolute bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            {/* Top Section */}
            <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
                <h2 className="text-2xl font-bold">GameHub</h2>
                <p className="mt-3 text-sm">
                Building websites, apps & smart solutions that make your ideas come alive.
                </p>
            </div>

            {/* Services */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Yours</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    {yours.map(your=>(
                        <li key={your.id}><Link to={your.url}>{your.title}</Link></li>
                    ))}
                </ul>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    {quickLinks.map(quickLink=>(
                        <li key={quickLink.id}><Link to={quickLink.url}>{quickLink.title}</Link></li>
                    ))}
                </ul>
            </div>

            </div>

            <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-sm text-neutral-900 dark:text-neutral-500">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
            </div>

        </div>
        </footer>
    );
}
