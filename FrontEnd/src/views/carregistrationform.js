

import React from 'react';

// Shared Tailwind CSS class strings
const inputClasses = "mt-1 block w-full p-2 border border-border rounded-md bg-input text-foreground";
const labelClasses = "block text-sm font-medium text-muted-foreground";
const containerClasses = "grid grid-cols-1 md:grid-cols-2 gap-4";

const FormInput = ({ id, label, type = "text", placeholder }) => (
  <div>
    <label htmlFor={id} className={labelClasses}>{label}</label>
    <input type={type} id={id} className={inputClasses} placeholder={placeholder} />
  </div>
);

const FormTextArea = ({ id, label, placeholder }) => (
  <div>
    <label htmlFor={id} className={labelClasses}>{label}</label>
    <textarea id={id} className={inputClasses} rows="4" placeholder={placeholder}></textarea>
  </div>
);

const FormFileInput = ({ id, label }) => (
  <div>
    <label htmlFor={id} className={labelClasses}>{label}</label>
    <input type="file" id={id} className={inputClasses} multiple />
  </div>
);

const CarAuctionForm = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Car Auction Submission</h1>
        <form className="space-y-4">
          <div className={containerClasses}>
            <FormInput id="name" label="Name" placeholder="John Doe" />
            <FormInput id="email" label="Email" type="email" placeholder="john@example.com" />
            <FormInput id="phoneno" label="Phone Number" type="tel" placeholder="123-456-7890" />
            <FormInput id="address" label="Address" placeholder="123 Main St" />
            <FormInput id="city" label="City" placeholder="Anytown" />
            <FormInput id="province" label="Province" placeholder="State/Province" />
            <FormInput id="postalcode" label="Postal Code" placeholder="12345" />
          </div>
          <div className={containerClasses}>
            <FormInput id="nameofoffering" label="Name of Offering" placeholder="Car Name" />
            <FormInput id="estimatedValue" label="Estimated Value" type="number" placeholder="10000" />
            <FormInput id="brand" label="Brand" placeholder="Brand" />
            <FormInput id="make" label="Make" placeholder="Make" />
            <FormInput id="model" label="Model" placeholder="Model" />
            <FormInput id="variant" label="Variant" placeholder="Variant" />
            <FormInput id="chassisNumber" label="Chassis Number" placeholder="Chassis Number" />
            <FormInput id="color" label="Color" placeholder="Color" />
            <FormInput id="numberPlate" label="Number Plate" placeholder="Number Plate" />
          </div>
          <FormTextArea id="detailedDescription" label="Detailed Description" placeholder="Provide a detailed description of the car" />
          <FormFileInput id="file" label="Upload Images" />
          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarAuctionForm;

