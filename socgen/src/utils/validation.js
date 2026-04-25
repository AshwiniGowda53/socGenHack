export const validateCustomerId = (id) => {
  return /^[56]\d{8}$/.test(id)
}