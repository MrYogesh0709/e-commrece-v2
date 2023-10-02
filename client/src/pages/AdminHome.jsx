import React, { useState } from "react";
import MobileFilter from "../features/product/components/MobileFilter";
import SearchBar from "../features/product/components/SearchBar";
import AdminProductGrid from "../features/admin/components/AdminProductGrid";

const AdminHome = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <>
      <div className="bg-white dark:bg-slate-900">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          {/* SearchBar */}
          <SearchBar />
          {/* Big screen */}
          <AdminProductGrid setMobileFiltersOpen={setMobileFiltersOpen} />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
