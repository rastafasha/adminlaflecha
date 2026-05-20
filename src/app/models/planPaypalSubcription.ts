export class planPaypalSubcription {
    data: any;
    plans: any;
    constructor(

        public id: string,
        public product_id: string,
        public name: string,
        public status: string,
        public total_cycles: number,
        public fixed_price: number,
        public setup_fee: number,
        public percentage: number,
        public billing_cycles: number,
        public frequency: string,

    ) { }

}

export class billing_cycles {
    frequency: frequency;
    tenure_type: "REGULAR";
    sequence: 1;
    total_cycles: number;
    pricing_scheme: pricing_scheme;

}
export class frequency {
    interval_unit: any;
    interval_count: number;
}
export class pricing_scheme {
    fixed_price: {
        value: number, //"3", // PRECIO MENSUAL QUE COBRAS 3.30USD
        currency_code: "USD"
    }
}
export class payment_preferences {
    auto_bill_outstanding: true;
    setup_fee: setup_fee;
    setup_fee_failure_action: "CONTINUE";
    payment_failure_threshold: 3
}
export class setup_fee {
    value: number;
    currency_code: "USD";
}
export class taxes {
    percentage: number; //"10", // 10USD + 10% = 11 USD
    inclusive: false
}
export class productPaypalSubcription {
    products: any;
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public image_url: string,
        public category: string,
        public type: 'PHYSICAL' | 'SERVICE',
    ) { }

}

export class generateSubcription {
    constructor(

        public id: string,
        public orderID: string,
        public plan_id: string,
        public name: string,
        public surname: string,
        public email: string,
        public status: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

}


