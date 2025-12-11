import { useState } from "react";
import { FaCopy, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

const ShareWishlistButton = () => {
    const [open, setOpen] = useState(false);
    const url = window.location.href;

    const shareOptions = [
        {
            label: "Copy Link",
            icon: <FaCopy className="text-gray-600 dark:text-gray-300" />,
            action: () => {
                navigator.clipboard.writeText(url);
                toast.success("Link Copied!");
                setOpen(false);
            }
        },
        {
            label: "WhatsApp",
            icon: <FaWhatsapp className="text-green-600 dark:text-green-400" />,
            action: () => {
                window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
                setOpen(false);
            }
        },
        {
            label: "Facebook",
            icon: <FaFacebook className="text-blue-600 dark:text-blue-400" />,
            action: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    "_blank"
                );
                setOpen(false);
            }
        },
        {
            label: "Instagram",
            icon: <FaInstagram className="text-pink-600 dark:text-pink-400" />,
            action: () => {
                window.open(
                    `https://www.instagram.com/direct/inbox/`,
                    "_blank"
                );
                setOpen(false);
            }
        }
    ];

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95 min-w-[100px]"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                </svg>
                Share
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700 rounded-lg w-48 sm:w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 border-b dark:border-gray-700">
                            Share via
                        </div>
                        <div className="p-1">
                            {shareOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={opt.action}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-150 text-sm"
                                >
                                    <span className="text-lg flex-shrink-0">{opt.icon}</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-200 text-left truncate">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="px-3 py-2 border-t dark:border-gray-700">
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate" title={url}>
                                {url.length > 30 ? `${url.substring(0, 30)}...` : url}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShareWishlistButton;