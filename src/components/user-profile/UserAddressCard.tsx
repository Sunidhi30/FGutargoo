
// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useModal } from "../../hooks/useModal";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Button from "../ui/button/Button";
// import { Modal } from "../ui/modal";

// export default function VendorPackageCard() {
//   const { isOpen, openModal, closeModal } = useModal();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     revenueType: "",
//     viewThreshold: 0,
//     price: 0,
//     rentalDuration: 0,
//     vendor_id: "", // Ensure to pass the vendor's ID
//   });
//   const [packages, setPackages] = useState([]);
//   // ✅ Fetch packages on component mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:9000/api/vendors/get-packages",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setPackages(response.data || []); // Ensure fallback if undefined
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // ✅ Handle save package
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         "http://localhost:9000/api/vendors/create-packages",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Package created:", response.data);

//       // Append new package to the list and display it below the form
//       setPackages((prev) => [response.data, ...prev]);

//       // Close modal after save
//       closeModal();

//       // Clear form data
//       setFormData({
//         name: "",
//         description: "",
//         revenueType: "",
//         viewThreshold: 0,
//         price: 0,
//         rentalDuration: 0,
//         vendor_id: "",
//       });
//     } catch (error) {
//       console.error("Error saving package", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });

//       alert("Failed to create package. Check console for details.");
//     }
//   };

//   // Handle form field change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
//         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
//               Packages
//             </h4>

//             <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
//               <div>
//                 <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                   Package List
//                 </p>
//                 {Array.isArray(packages) && packages.length > 0 ? (
//                   <ul className="mt-2 space-y-2">
//                     {packages.map((pkg) => (
//                       <li
//                         key={pkg._id}
//                         className="text-sm font-medium text-gray-800 dark:text-white/90 border-b pb-1"
//                       >
//                         {pkg.name} — {pkg.revenueType} — ${pkg.price}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No packages available.</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={openModal}
//             className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
//           >
//             <svg
//               className="fill-current"
//               width="18"
//               height="18"
//               viewBox="0 0 18 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
//                 fill=""
//               />
//             </svg>
//             Create New Package
//           </button>
//         </div>
//       </div>

//       {/* Modal for creating a new package */}
//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
//         <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
//           <div className="px-2 pr-14">
//             <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//               Create Package
//             </h4>
//             <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
//               Fill in the details to create a new package.
//             </p>
//           </div>
//           <form className="flex flex-col">
//             <div className="px-2 overflow-y-auto custom-scrollbar">
//               <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
//                 <div>
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label>Description</Label>
//                   <Input
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label>Revenue Type</Label>
//                   <Input
//                     type="text"
//                     name="revenueType"
//                     value={formData.revenueType}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label>Price</Label>
//                   <Input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label>Rental Duration (in days)</Label>
//                   <Input
//                     type="number"
//                     name="rentalDuration"
//                     value={formData.rentalDuration}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
//               <Button size="sm" variant="outline" onClick={closeModal}>
//                 Close
//               </Button>
//               <Button size="sm" onClick={handleSave}>
//                 Save Package
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// }




"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

export default function VendorPackageCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    revenueType: "",
    viewThreshold: 0,
    price: 0,
    rentalDuration: 0,
    vendor_id: "",
  });
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:9000/api/vendors/get-packages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPackages(response.data || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9000/api/vendors/create-packages",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPackages((prev) => [response.data, ...prev]);
      closeModal();
      setFormData({
        name: "",
        description: "",
        revenueType: "",
        viewThreshold: 0,
        price: 0,
        rentalDuration: 0,
        vendor_id: "",
      });
    } catch (error) {
      console.error("Error saving package", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      alert("Failed to create package. Check console for details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start">
          <div className="w-full lg:w-3/5">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Vendor Packages</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Below is the list of your existing packages.
            </p>
            <div className="mt-4 space-y-3">
              {/* {Array.isArray(packages) && packages.length > 0 ? (
                packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {pkg.revenueType} | ${pkg.price}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No packages available.</p>
              )} */}
              {Array.isArray(packages) && packages.length > 0 ? (
  packages.map((pkg) => (
    <div
      key={pkg._id}
      className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
    >
      <h3 className="font-semibold text-gray-800 dark:text-white">{pkg.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {pkg.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Revenue Type: {pkg.revenueType}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Price: ${pkg.price}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Rental Duration: {pkg.rentalDuration} days
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        View Threshold: {pkg.viewThreshold}
      </p>
    </div>
  ))
) : (
  <p className="text-gray-500 dark:text-gray-400">No packages available.</p>
)}

            </div>
          </div>

          <div className="lg:w-1/3 mt-4 lg:mt-0">
            <Button variant="default" size="lg" className="w-full" onClick={openModal}>
              + Create New Package
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-6 bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Create Package</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Fill out the form to create a new vendor package.
          </p>
          <form className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Revenue Type</Label>
              <Input type="text" name="revenueType" value={formData.revenueType} onChange={handleChange} required />
            </div>
            <div>
              <Label>Price ($)</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
              <Label>Rental Duration (Days)</Label>
              <Input
                type="number"
                name="rentalDuration"
                value={formData.rentalDuration}
                onChange={handleChange}
              />
            </div>
          </form>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Package
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
