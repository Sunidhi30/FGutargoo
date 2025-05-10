// "use client";
// import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Checkbox from "../input/Checkbox";

// export default function CheckboxComponents() {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isCheckedTwo, setIsCheckedTwo] = useState(true);
//   const [isCheckedDisabled, setIsCheckedDisabled] = useState(false);
//   return (
//     <ComponentCard title="Checkbox">
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-3">
//           <Checkbox checked={isChecked} onChange={setIsChecked} />
//           <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
//             Default
//           </span>
//         </div>
//         <div className="flex items-center gap-3">
//           <Checkbox
//             checked={isCheckedTwo}
//             onChange={setIsCheckedTwo}
//             label="Checked"
//           />
//         </div>
//         <div className="flex items-center gap-3">
//           <Checkbox
//             checked={isCheckedDisabled}
//             onChange={setIsCheckedDisabled}
//             disabled
//             label="Disabled"
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }
"use client";
import DatePicker from '@/components/form/date-picker';
import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import { ChevronDownIcon, EnvelopeIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../../icons';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import MultiSelect from "../MultiSelect";
import Select from '../Select';
import PhoneInput from "../group-input/PhoneInput";
import FileInput from "../input/FileInput";
import Input from '../input/InputField';
import Radio from "../input/Radio";
import TextArea from "../input/TextArea";
import Switch from "../switch/Switch";

export default function AllFormComponents() {
  // DefaultInputs state and handlers
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  // ToggleSwitch handlers
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };

  // Dropzone handlers
  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    // Handle file uploads here
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  // FileInput handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  // InputGroup data
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  // InputStates state and handlers
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  // RadioButtons state and handlers
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  // SelectInputs state and handlers
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "1", text: "Option 1", selected: false },
    { value: "2", text: "Option 2", selected: false },
    { value: "3", text: "Option 3", selected: false },
    { value: "4", text: "Option 4", selected: false },
    { value: "5", text: "Option 5", selected: false },
  ];

  // TextAreaInput state
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  return (
    <div className="space-y-8">
      {/* DefaultInputs */}
      <ComponentCard title="Default Inputs">
        <div className="space-y-6">
          <div>
            <Label>Input</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Input with Placeholder</Label>
            <Input type="text" placeholder="info@gmail.com" />
          </div>
          <div>
            <Label>Select Input</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div>
            <Label>Password Input</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <DatePicker
              id="date-picker"
              label="Date Picker Input"
              placeholder="Select a date"
              onChange={(dates, currentDateString) => {
                // Handle your logic
                console.log({ dates, currentDateString });
              }}
            />
          </div>

          <div>
            <Label htmlFor="tm">Time Picker Input</Label>
            <div className="relative">
              <Input
                type="time"
                id="tm"
                name="tm"
                onChange={(e) => console.log(e.target.value)}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="tm">Input with Payment</Label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Card number"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                  <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                  <path
                    d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                    fill="#FC6020"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </ComponentCard>

      {/* ToggleSwitch */}
      <ComponentCard title="Toggle switch input">
        <div className="flex gap-4">
          <Switch
            label="Default"
            defaultChecked={true}
            onChange={handleSwitchChange}
          />
          <Switch
            label="Checked"
            defaultChecked={true}
            onChange={handleSwitchChange}
          />
          <Switch label="Disabled" disabled={true} />
        </div>
        <div className="flex gap-4">
          <Switch
            label="Default"
            defaultChecked={true}
            onChange={handleSwitchChange}
            color="gray"
          />
          <Switch
            label="Checked"
            defaultChecked={true}
            onChange={handleSwitchChange}
            color="gray"
          />
          <Switch label="Disabled" disabled={true} color="gray" />
        </div>
      </ComponentCard>

      {/* DropzoneComponent */}
      <ComponentCard title="Dropzone">
        <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
            id="demo-upload"
          >
            {/* Hidden Input */}
            <input {...getInputProps()} />

            <div className="dz-message flex flex-col items-center m-0!">
              {/* Icon Container */}
              <div className="mb-[22px] flex justify-center">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
              </h4>

              <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                Drag and drop your PNG, JPG, WebP, SVG images here or browse
              </span>

              <span className="font-medium underline text-theme-sm text-brand-500">
                Browse File
              </span>
            </div>
          </form>
        </div>
      </ComponentCard>

      {/* FileInputExample */}
      <ComponentCard title="File Input">
        <div>
          <Label>Upload file</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>
      </ComponentCard>

      {/* InputGroup */}
      <ComponentCard title="Input Group">
        <div className="space-y-6">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                placeholder="info@gmail.com"
                type="text"
                className="pl-[62px]"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <EnvelopeIcon />
              </span>
            </div>
          </div>
          <div>
            <Label>Phone</Label>
            <PhoneInput
              selectPosition="start"
              countries={countries}
              placeholder="+1 (555) 000-0000"
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <PhoneInput
              selectPosition="end"
              countries={countries}
              placeholder="+1 (555) 000-0000"
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
      </ComponentCard>

      {/* InputStates */}
      <ComponentCard
        title="Input States"
        desc="Validation styles for error, success and disabled states on form controls."
      >
        <div className="space-y-5 sm:space-y-6">
          {/* Error Input */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={email}
              error={error}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              hint={error ? "This is an invalid email address." : ""}
            />
          </div>

          {/* Success Input */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={email}
              success={!error}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              hint={!error ? "Valid email!" : ""}
            />
          </div>

          {/* Disabled Input */}
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              defaultValue="disabled@example.com"
              disabled={true}
              placeholder="Disabled email"
              hint="This field is disabled."
            />
          </div>
        </div>
      </ComponentCard>

      {/* RadioButtons */}
      <ComponentCard title="Radio Buttons">
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="option1"
            checked={selectedValue === "option1"}
            onChange={handleRadioChange}
            label="Default"
          />
          <Radio
            id="radio2"
            name="group1"
            value="option2"
            checked={selectedValue === "option2"}
            onChange={handleRadioChange}
            label="Selected"
          />
          <Radio
            id="radio3"
            name="group1"
            value="option3"
            checked={selectedValue === "option3"}
            onChange={handleRadioChange}
            label="Disabled"
            disabled={true}
          />
        </div>
      </ComponentCard>

      {/* SelectInputs */}
      <ComponentCard title="Select Inputs">
        <div className="space-y-6">
          <div>
            <Label>Select Input</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Select Option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div className="relative">
            <MultiSelect
              label="Multiple Select Options"
              options={multiOptions}
              defaultSelected={["1", "3"]}
              onChange={(values) => setSelectedValues(values)}
            />
            <p className="sr-only">
              Selected Values: {selectedValues.join(", ")}
            </p>
          </div>
        </div>
      </ComponentCard>

      {/* TextAreaInput */}
      <ComponentCard title="Textarea input field">
        <div className="space-y-6">
          {/* Default TextArea */}
          <div>
            <Label>Description</Label>
            <TextArea
              value={message}
              onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>

          {/* Disabled TextArea */}
          <div>
            <Label>Description</Label>
            <TextArea rows={6} disabled />
          </div>

          {/* Error TextArea */}
          <div>
            <Label>Description</Label>
            <TextArea
              rows={6}
              value={messageTwo}
              error
              onChange={(value) => setMessageTwo(value)}
              hint="Please enter a valid message."
            />
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}