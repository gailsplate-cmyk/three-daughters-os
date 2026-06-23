/**
 * API Client for Greenline Property Backend
 * Handles all communication with the FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Customer {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  created_at: string;
}

export interface Property {
  id: string;
  customer_id: string;
  address: string;
  city: string;
  province: string;
  postal_code?: string;
  property_type: string;
  notes?: string;
  access_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: string;
  customer_id: string;
  property_id?: string;
  service_type: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  preferred_timing?: string;
  photo_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  request_id?: string;
  property_id: string;
  title: string;
  scope_summary: string;
  estimate_low: number;
  estimate_high: number;
  status: string;
  created_at: string;
  updated_at: string;
}

class GreenelineAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.detail || `API Error: ${response.statusText}`
      );
    }

    return response.json();
  }

  // Customers
  async createCustomer(payload: {
    full_name: string;
    email?: string;
    phone?: string;
  }): Promise<Customer> {
    return this.request<Customer>("/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getCustomers(): Promise<Customer[]> {
    return this.request<Customer[]>("/customers");
  }

  async getCustomer(customerId: string): Promise<Customer> {
    return this.request<Customer>(`/customers/${customerId}`);
  }

  // Properties
  async createProperty(payload: {
    customer_id: string;
    address: string;
    city?: string;
    province?: string;
    postal_code?: string;
    property_type?: string;
    notes?: string;
    access_notes?: string;
  }): Promise<Property> {
    return this.request<Property>("/properties", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getProperties(): Promise<Property[]> {
    return this.request<Property[]>("/properties");
  }

  async getProperty(propertyId: string): Promise<Property> {
    return this.request<Property>(`/properties/${propertyId}`);
  }

  // Service Requests (Quote intake)
  async createServiceRequest(payload: {
    customer_id: string;
    property_id?: string;
    service_type: string;
    description: string;
    budget_min?: number;
    budget_max?: number;
    preferred_timing?: string;
    photo_urls?: string[];
  }): Promise<ServiceRequest> {
    return this.request<ServiceRequest>("/service-requests", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getServiceRequests(): Promise<ServiceRequest[]> {
    return this.request<ServiceRequest[]>("/service-requests");
  }

  async getServiceRequest(requestId: string): Promise<ServiceRequest> {
    return this.request<ServiceRequest>(`/service-requests/${requestId}`);
  }

  // Quotes
  async createQuote(payload: {
    request_id?: string;
    property_id: string;
    title: string;
    scope_summary: string;
    estimate_low: number;
    estimate_high: number;
    status?: string;
  }): Promise<Quote> {
    return this.request<Quote>("/quotes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getQuotes(): Promise<Quote[]> {
    return this.request<Quote[]>("/quotes");
  }

  async getQuote(quoteId: string): Promise<Quote> {
    return this.request<Quote>(`/quotes/${quoteId}`);
  }

  // Health check
  async health(): Promise<{ status: string; service: string }> {
    return this.request("/health");
  }
}

export const api = new GreenelineAPI();
