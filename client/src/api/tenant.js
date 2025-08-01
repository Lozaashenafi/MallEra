import API from "../utils/api";
export const tenantRegister = async (userData) => {
  try {
    const response = await API.post("/tenant/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTenants = async (mallId) => {
  try {
    const response = await API.get(`/tenant/${mallId}/list`);
    console.log("Tenants fetched:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch tenants");
  }
};

export const updateTenant = async (tenantId, updatedData) => {
  try {
    const response = await API.put(`/tenant/update/${tenantId}`, updatedData);
    console.log("Tenant updated:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
