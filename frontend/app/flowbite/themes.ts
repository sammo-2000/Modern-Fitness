import type { CustomFlowbiteTheme } from "flowbite-react";

export const datePickerTheme: CustomFlowbiteTheme["datepicker"] = {
    views: {
      days: {
        items: {
          item: {
            selected: "bg-blue-500 text-white hover:bg-blue-400",
            disabled:
              "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100",
          },
        },
      },
      months: {
        items: {
          item: {
            selected: "bg-blue-500 text-white hover:bg-blue-400",
            disabled:
              "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100",
          },
        },
      },
      years: {
        items: {
          item: {
            selected: "bg-blue-500 text-white hover:bg-blue-400",
            disabled:
              "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100",
          },
        },
      },
      decades: {
        items: {
          item: {
            selected: "bg-blue-500 text-white hover:bg-blue-400",
            disabled:
              "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100",
          },
        },
      },
    },
  };