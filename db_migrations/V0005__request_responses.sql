CREATE TABLE IF NOT EXISTS request_responses (
    id SERIAL PRIMARY KEY,
    request_id INTEGER NOT NULL REFERENCES buyer_requests(id),
    supplier_user_id INTEGER,
    supplier_name VARCHAR(300) NOT NULL,
    supplier_phone VARCHAR(50),
    supplier_email VARCHAR(200),
    price VARCHAR(100),
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_request_responses_request ON request_responses(request_id);
CREATE INDEX IF NOT EXISTS idx_request_responses_supplier ON request_responses(supplier_user_id);
