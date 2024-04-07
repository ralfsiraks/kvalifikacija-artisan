export interface StripeSession {
	session: {
		id: string;
		object: string;
		after_expiration: any;
		allow_promotion_codes: any;
		amount_subtotal: number;
		amount_total: number;
		automatic_tax: {
			enabled: boolean;
			liability: any;
			status: any;
		};
		billing_address_collection: any;
		cancel_url: string;
		client_reference_id: any;
		client_secret: any;
		consent: any;
		consent_collection: any;
		created: number;
		currency: string;
		currency_conversion: any;
		custom_fields: any[];
		custom_text: {
			after_submit: any;
			shipping_address: any;
			submit: any;
			terms_of_service_acceptance: any;
		};
		customer: string;
		customer_creation: string;
		customer_details: {
			address: {
				city: any;
				country: string;
				line1: any;
				line2: any;
				postal_code: any;
				state: any;
			};
			email: string;
			name: string;
			phone: any;
			tax_exempt: string;
			tax_ids: any[];
		};
		customer_email: string;
		expires_at: number;
		invoice: any;
		invoice_creation: {
			enabled: boolean;
			invoice_data: {
				account_tax_ids: any;
				custom_fields: any;
				description: any;
				footer: any;
				issuer: any;
				metadata: any[];
				rendering_options: any;
			};
		};
		livemode: boolean;
		locale: any;
		metadata: any[];
		mode: string;
		payment_intent: string;
		payment_link: any;
		payment_method_collection: string;
		payment_method_configuration_details: any;
		payment_method_options: {
			card: {
				request_three_d_secure: string;
			};
		};
		payment_method_types: string[];
		payment_status: string;
		phone_number_collection: {
			enabled: boolean;
		};
		recovered_from: any;
		setup_intent: any;
		shipping_address_collection: any;
		shipping_cost: any;
		shipping_details: any;
		shipping_options: any[];
		status: string;
		submit_type: any;
		subscription: any;
		success_url: string;
		total_details: {
			amount_discount: number;
			amount_shipping: number;
			amount_tax: number;
		};
		ui_mode: string;
		url: any;
		payment_method_details: {
			id: string;
			object: string;
			billing_details: {
				address: {
					city: any;
					country: string;
					line1: any;
					line2: any;
					postal_code: any;
					state: any;
				};
				email: string;
				name: string;
				phone: any;
			};
			card: {
				brand: string;
				checks: {
					address_line1_check: any;
					address_postal_code_check: any;
					cvc_check: string;
				};
				country: string;
				display_brand: string;
				exp_month: number;
				exp_year: number;
				fingerprint: string;
				funding: string;
				generated_from: any;
				last4: string;
				networks: {
					available: string[];
					preferred: any;
				};
				three_d_secure_usage: {
					supported: boolean;
				};
				wallet: any;
			};
			created: number;
			customer: any;
			livemode: boolean;
			metadata: any[];
			type: string;
		};
	};
	payment_intent: {
		id: string;
		object: string;
		amount: number;
		amount_capturable: number;
		amount_details: {
			tip: any[];
		};
		amount_received: number;
		application: any;
		application_fee_amount: any;
		automatic_payment_methods: any;
		canceled_at: any;
		cancellation_reason: any;
		capture_method: string;
		client_secret: string;
		confirmation_method: string;
		created: number;
		currency: string;
		customer: string;
		description: any;
		invoice: any;
		last_payment_error: any;
		latest_charge: string;
		livemode: boolean;
		metadata: any[];
		next_action: any;
		on_behalf_of: any;
		payment_method: string;
		payment_method_configuration_details: any;
		payment_method_options: {
			card: {
				installments: any;
				mandate_options: any;
				network: any;
				request_three_d_secure: string;
			};
		};
		payment_method_types: string[];
		processing: any;
		receipt_email: any;
		review: any;
		setup_future_usage: any;
		shipping: any;
		source: any;
		statement_descriptor: any;
		statement_descriptor_suffix: any;
		status: string;
		transfer_data: any;
		transfer_group: any;
	};
}
