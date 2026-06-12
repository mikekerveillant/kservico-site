import type { Branch } from "@/types";

export const MOCK_BRANCHES: Branch[] = [
  { id: "1", name: "KServico Cubao (HQ)", region: "Metro Manila", address: "210 P. Tuazon Blvd", city: "Cubao, Quezon City", province: "Metro Manila", phone: "(02) 7730-0375", latitude: 14.6191, longitude: 121.0526 },
  { id: "2", name: "KServico Caloocan", region: "Metro Manila", address: "123 A. Mabini St", city: "Caloocan City", province: "Metro Manila", phone: "(02) 8356-1234", latitude: 14.6507, longitude: 120.9664 },
  { id: "3", name: "KServico Monumento", region: "Metro Manila", address: "Monumento Circle", city: "Caloocan City", province: "Metro Manila", phone: "(02) 8356-5678", latitude: 14.6566, longitude: 120.9842 },
  { id: "4", name: "KServico Malabon", region: "Metro Manila", address: "Rizal Ave, Malabon", city: "Malabon", province: "Metro Manila", phone: "(02) 8281-1234", latitude: 14.6618, longitude: 120.9575 },
  { id: "5", name: "KServico Valenzuela", region: "Metro Manila", address: "McArthur Hwy, Valenzuela", city: "Valenzuela City", province: "Metro Manila", phone: "(02) 8292-4321", latitude: 14.6997, longitude: 120.9707 },
  { id: "6", name: "KServico Novaliches", region: "Metro Manila", address: "Quirino Hwy, Novaliches", city: "Quezon City", province: "Metro Manila", phone: "(02) 8418-8888", latitude: 14.7225, longitude: 121.0306 },
  { id: "7", name: "KServico Bulacan (Malolos)", region: "Bulacan", address: "Paseo de Sta. Clara", city: "Malolos", province: "Bulacan", phone: "(044) 791-1234", latitude: 14.8527, longitude: 120.8119 },
  { id: "8", name: "KServico Bulacan (Meycauayan)", region: "Bulacan", address: "Malhacan Road", city: "Meycauayan", province: "Bulacan", phone: "(044) 840-5678", latitude: 14.7333, longitude: 120.9601 },
  { id: "9", name: "KServico San Jose del Monte", region: "Bulacan", address: "Quirino Hwy", city: "San Jose del Monte", province: "Bulacan", phone: "(044) 760-3456", latitude: 14.8143, longitude: 121.0461 },
  { id: "10", name: "KServico Pampanga (Angeles)", region: "Pampanga", address: "MacArthur Hwy, Angeles", city: "Angeles City", province: "Pampanga", phone: "(045) 887-4321", latitude: 15.1450, longitude: 120.5887 },
  { id: "11", name: "KServico Pampanga (San Fernando)", region: "Pampanga", address: "Jose Abad Santos Ave", city: "San Fernando", province: "Pampanga", phone: "(045) 961-2345", latitude: 15.0289, longitude: 120.6899 },
  { id: "12", name: "KServico Tarlac City", region: "Tarlac", address: "Mactan St, Tarlac City", city: "Tarlac City", province: "Tarlac", phone: "(045) 982-6789", latitude: 15.4881, longitude: 120.5985 },
  { id: "13", name: "KServico Pangasinan (Dagupan)", region: "Pangasinan", address: "AB Fernandez Ave", city: "Dagupan City", province: "Pangasinan", phone: "(075) 522-7890", latitude: 16.0433, longitude: 120.3336 },
  { id: "14", name: "KServico Pangasinan (Urdaneta)", region: "Pangasinan", address: "Macabulos Drive", city: "Urdaneta City", province: "Pangasinan", phone: "(075) 568-4567", latitude: 15.9758, longitude: 120.5714 },
  { id: "15", name: "KServico La Union (San Fernando)", region: "La Union", address: "Quezon Ave, San Fernando", city: "San Fernando City", province: "La Union", phone: "(072) 700-5678", latitude: 16.6159, longitude: 120.3167 },
  { id: "16", name: "KServico Rizal (Antipolo)", region: "Rizal", address: "Circumferential Road", city: "Antipolo City", province: "Rizal", phone: "(02) 8697-3456", latitude: 14.5865, longitude: 121.1763 },
  { id: "17", name: "KServico Cavite (Bacoor)", region: "Cavite", address: "Molino Blvd, Bacoor", city: "Bacoor City", province: "Cavite", phone: "(046) 432-7890", latitude: 14.4580, longitude: 120.9469 },
  { id: "18", name: "KServico Cavite (Imus)", region: "Cavite", address: "Aguinaldo Hwy, Imus", city: "Imus City", province: "Cavite", phone: "(046) 471-2345", latitude: 14.4296, longitude: 120.9367 },
  { id: "19", name: "KServico Laguna (Sta. Rosa)", region: "Laguna", address: "Brgy. Macabling", city: "Sta. Rosa City", province: "Laguna", phone: "(049) 544-8901", latitude: 14.3122, longitude: 121.1114 },
  { id: "20", name: "KServico Laguna (Calamba)", region: "Laguna", address: "National Hwy, Calamba", city: "Calamba City", province: "Laguna", phone: "(049) 545-3456", latitude: 14.2113, longitude: 121.1653 },
];

export const REGIONS = [...new Set(MOCK_BRANCHES.map((b) => b.region))].sort();
