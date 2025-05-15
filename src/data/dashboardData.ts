
// Mock data for the dashboard
export const dashboardData = {
  creditUsageData: [
    { name: "Jan", amount: 85000 },
    { name: "Feb", amount: 120000 },
    { name: "Mar", amount: 75000 },
    { name: "Apr", amount: 165000 },
    { name: "May", amount: 175000 },
  ],

  revenueData: [
    { name: "Jan", value: 540 },
    { name: "Feb", value: 620 },
    { name: "Mar", value: 780 },
    { name: "Apr", value: 870 },
    { name: "May", value: 960 },
    { name: "Jun", value: 1120 },
  ],

  performanceData: [
    { name: "Week 1", value: 400 },
    { name: "Week 2", value: 450 },
    { name: "Week 3", value: 420 },
    { name: "Week 4", value: 570 },
  ],

  purchaseOrderStatusData: [
    { name: "Pending", value: 8, color: "#FFB800" },
    { name: "Approved", value: 12, color: "#92C264" },
    { name: "Declined", value: 3, color: "#F87171" },
    { name: "Processing", value: 5, color: "#60A5FA" },
    { name: "Paid", value: 15, color: "#34D399" },
  ],

  recentPurchaseOrders: [
    { id: "PO-2023-001", client: "SolarTech Ltd", amount: 32500, date: "2023-05-10", status: "Approved" },
    { id: "PO-2023-002", client: "EcoEnergy Solutions", amount: 18750, date: "2023-05-12", status: "Pending" },
    { id: "PO-2023-003", client: "GreenPower Inc", amount: 45000, date: "2023-05-14", status: "Processing" },
    { id: "PO-2023-004", client: "SunWise Energy", amount: 27800, date: "2023-05-15", status: "Paid" },
    { id: "PO-2023-005", client: "BrightSolar Co", amount: 12400, date: "2023-05-16", status: "Declined" },
  ],

  statusColors: {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Declined: "bg-red-100 text-red-800",
    Processing: "bg-blue-100 text-blue-800",
    Paid: "bg-emerald-100 text-emerald-800"
  }
};
