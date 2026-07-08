CREATE TABLE IF NOT EXISTS buyer_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR(300) NOT NULL,
    category VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    quantity VARCHAR(100),
    unit VARCHAR(50),
    budget VARCHAR(100),
    region VARCHAR(200),
    deadline VARCHAR(100),
    contact_name VARCHAR(200) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(200),
    company_name VARCHAR(300),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    matched_suppliers INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS request_deliveries (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES buyer_requests(id),
    supplier_id INTEGER NOT NULL,
    supplier_name VARCHAR(300),
    supplier_email VARCHAR(200),
    match_reason VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_buyer_requests_user ON buyer_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_buyer_requests_category ON buyer_requests(category);
CREATE INDEX IF NOT EXISTS idx_request_deliveries_request ON request_deliveries(request_id);
