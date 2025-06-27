// Define OTP purposes for user and admin based on actions
const purposeMap = {
  register: {
    user: "register",
    admin: "adminRegister",
  },
  resetPassword: {
    user: "resetPassword",
    admin: "resetAdminPassword",
  },
  resetEmail: {
    user: "resetEmail",
    admin: "resetAdminEmail",
  },
  resetContact: {
    user: "resetContact",
    admin: "resetAdminContact",
  },
};

// Generate purpose string based on action and role
const getOtpPurpose = (action, role = "user") => {
  const lowerRole = role.toLowerCase();
  const purpose = purposeMap?.[action]?.[lowerRole];
  if (!purpose) {
    throw new Error(`Invalid action-role combo: ${action}-${role}`);
  }
  return purpose;
};

// Flatten all purpose values for validation
const allPurposes = Object.values(purposeMap)
  .map((roles) => Object.values(roles))
  .flat();

// Check if a given purpose is valid
const isValidPurpose = (purpose) => allPurposes.includes(purpose);

// Get high-level category (register, resetPassword, etc.) from a purpose string
const getPurposeCategory = (purpose) => {
  for (const [category, roleMap] of Object.entries(purposeMap)) {
    if (Object.values(roleMap).includes(purpose)) return category;
  }
  return null;
};

export {
  purposeMap,
  getOtpPurpose,
  isValidPurpose,
  getPurposeCategory,
  allPurposes
};
