import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

// Sample data for the main menu items
const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true }, // This item has a submenu
  { id: 4, name: "Contact", url: "/contact" },
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    // Main menu container
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? ( // Check if the item has a submenu
              // Render menu item with a submenu
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)} // Show submenu on mouse enter
                onMouseLeave={() => setShowCatMenu(false)} // Hide submenu on mouse leave
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && ( // Render the submenu if showCatMenu is true
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                    {categories?.map(({ attributes: c, id }) => {
                      // Map through categories for submenu items
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => setShowCatMenu(false)} // Hide submenu on clicking a submenu item
                        >
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {c.name}
                            <span className="opacity-50 text-sm">{`(${c.products.data.length})`}</span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              // Render menu item without a submenu
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
