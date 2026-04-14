/**
 * User account schema
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} email - User's email address
 * @property {string} fullName - Full name of the user
 * @property {string} phone - User's phone number
 * @property {'customer' | 'professional' | 'admin'} role - The user's role 
 * @property {boolean} isVerified - Whether the user phone number is verified
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Account update date
 */

/**
 * Professional profile schema, extending User
 * @typedef {Object} Professional
 * @property {string} id - Unique professional ID
 * @property {string} userId - Reference to the core User ID
 * @property {string} bio - Short biography
 * @property {string} categoryId - Primary category ID
 * @property {Array<{name: string, description: string, price: number, active: boolean}>} services - Provided services
 * @property {number} rating - Average rating from reviews
 * @property {number} reviewCount - Total number of reviews
 * @property {boolean} isActive - Whether the profile is active for search
 * @property {'pending' | 'approved' | 'rejected'} verificationStatus - KYC verification status
 */

/**
 * Booking schema
 * @typedef {Object} Booking
 * @property {string} id - Unique booking ID
 * @property {string} customerId - ID of the customer who created the booking
 * @property {string} professionalId - ID of the professional booked
 * @property {string} serviceName - Name of the specific service
 * @property {Date} scheduledAt - When the service is scheduled to happen
 * @property {'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected'} status - Current status of the booking
 * @property {number} amount - Total amount for the booking
 * @property {Date} createdAt - When the booking was created
 */

/**
 * Category schema
 * @typedef {Object} Category
 * @property {string} id - Unique category ID
 * @property {string} slug - URL friendly slug e.g. 'home-cleaning'
 * @property {string} name - Display name e.g. 'Home Cleaning'
 * @property {string} icon - Icon identifier or UI name
 * @property {string} description - Brief description of this category
 */

export default {};
