export type Lead = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  notes: string;
  status: "new" | "contacted" | "quoted";
};

export type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyIds: string[];
};

export type Property = {
  id: string;
  address: string;
  customerId: string;
  notes: string;
  lastServiceDate: string;
};

export type Quote = {
  id: string;
  customerName: string;
  propertyAddress: string;
  amount: number;
  status: "draft" | "sent" | "approved";
};

export type ScheduleItem = {
  id: string;
  customerName: string;
  propertyAddress: string;
  serviceType: string;
  scheduledDate: string;
  status: "scheduled" | "completed";
};

export type Invoice = {
  id: string;
  customerName: string;
  amount: number;
  status: "paid" | "unpaid";
  dueDate: string;
};

type Store = {
  leads: Lead[];
  customers: Customer[];
  properties: Property[];
  quotes: Quote[];
  schedule: ScheduleItem[];
  invoices: Invoice[];
};

const store: Store = {
  leads: [
    {
      id: "LD-1001",
      createdAt: new Date().toISOString(),
      fullName: "Sample Lead",
      email: "sample@example.com",
      phone: "(555) 101-2020",
      address: "120 Oak Street",
      serviceType: "Routine Lawn Care",
      notes: "Looking for weekly maintenance.",
      status: "new",
    },
  ],
  customers: [
    {
      id: "CU-1001",
      fullName: "Avery Thompson",
      email: "avery@example.com",
      phone: "(555) 222-3344",
      propertyIds: ["PR-1001"],
    },
  ],
  properties: [
    {
      id: "PR-1001",
      address: "45 Cedar Lane",
      customerId: "CU-1001",
      notes: "Back gate access on left side.",
      lastServiceDate: "2026-06-10",
    },
  ],
  quotes: [
    {
      id: "QT-1001",
      customerName: "Avery Thompson",
      propertyAddress: "45 Cedar Lane",
      amount: 180,
      status: "sent",
    },
  ],
  schedule: [
    {
      id: "SC-1001",
      customerName: "Avery Thompson",
      propertyAddress: "45 Cedar Lane",
      serviceType: "Cleanup",
      scheduledDate: "2026-06-24",
      status: "scheduled",
    },
  ],
  invoices: [
    {
      id: "IN-1001",
      customerName: "Avery Thompson",
      amount: 180,
      status: "unpaid",
      dueDate: "2026-06-28",
    },
  ],
};

function nextId(prefix: string, listLength: number): string {
  const numeric = String(1000 + listLength + 1);
  return `${prefix}-${numeric}`;
}

export function addLead(input: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  notes: string;
}): Lead {
  const lead: Lead = {
    id: nextId("LD", store.leads.length),
    createdAt: new Date().toISOString(),
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    address: input.address,
    serviceType: input.serviceType,
    notes: input.notes,
    status: "new",
  };

  store.leads.unshift(lead);

  const existingCustomer = store.customers.find(
    (customer) => customer.email.toLowerCase() === input.email.toLowerCase(),
  );

  if (!existingCustomer) {
    const customerId = nextId("CU", store.customers.length);
    const propertyId = nextId("PR", store.properties.length);

    store.customers.unshift({
      id: customerId,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      propertyIds: [propertyId],
    });

    store.properties.unshift({
      id: propertyId,
      address: input.address,
      customerId,
      notes: "Created from quote request",
      lastServiceDate: "",
    });
  }

  return lead;
}

export function getBusinessSnapshot(): Store {
  return {
    leads: [...store.leads],
    customers: [...store.customers],
    properties: [...store.properties],
    quotes: [...store.quotes],
    schedule: [...store.schedule],
    invoices: [...store.invoices],
  };
}
