CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE,
    slug VARCHAR(200) NOT NULL UNIQUE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES users(id),
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name VARCHAR(300) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100),
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'RUB',
    discount_percentage DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    min_order_quantity INTEGER NOT NULL DEFAULT 1 CHECK (min_order_quantity > 0),
    max_order_quantity INTEGER,
    weight_kg DECIMAL(8,3),
    main_image_url TEXT,
    gallery_images_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    tags_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    attributes_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','inactive','archived')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    views_count INTEGER NOT NULL DEFAULT 0,
    favorites_count INTEGER NOT NULL DEFAULT 0,
    requests_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    published_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_products_supplier_id ON products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

CREATE TABLE IF NOT EXISTS promotion_campaigns (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('featured','discount','boost','banner')),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    product_ids_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','completed')),
    views INTEGER NOT NULL DEFAULT 0,
    clicks INTEGER NOT NULL DEFAULT 0,
    sales INTEGER NOT NULL DEFAULT 0,
    spent DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promotion_campaigns_supplier_id ON promotion_campaigns(supplier_id);

INSERT INTO categories (name, slug) VALUES
    ('Металлопрокат', 'metalloprokat'),
    ('Стройматериалы', 'stroymaterialy'),
    ('Электроника', 'elektronika'),
    ('Кровельные материалы', 'krovelnye-materialy'),
    ('Упаковочные материалы', 'upakovochnye-materialy'),
    ('Электротехника', 'elektrotehnika'),
    ('Канцелярские товары', 'kancelyarskie-tovary'),
    ('Крепёжные изделия', 'krepezhnye-izdeliya'),
    ('Светотехника', 'svetotehnika'),
    ('Отделочные материалы', 'otdelochnye-materialy'),
    ('Полимерные материалы', 'polimernye-materialy'),
    ('Измерительные приборы', 'izmeritelnye-pribory'),
    ('Сантехника', 'santehnika'),
    ('Отопление и вентиляция', 'otoplenie-i-ventilyaciya'),
    ('Автокомплектующие', 'avtokomplektuyushchie'),
    ('Мебель и интерьер', 'mebel-i-interer'),
    ('Спецодежда и СИЗ', 'specodezhda-i-siz'),
    ('Садовая техника', 'sadovaya-tehnika'),
    ('Химия и моющие средства', 'himiya-i-moyushchie-sredstva'),
    ('Пищевая продукция', 'pishchevaya-produkciya'),
    ('Текстиль и ткани', 'tekstil-i-tkani'),
    ('Медицинское оборудование', 'medicinskoe-oborudovanie'),
    ('Спортивные товары', 'sportivnye-tovary'),
    ('Бытовая техника', 'bytovaya-tehnika'),
    ('Игрушки и товары для детей', 'igrushki-i-tovary-dlya-detej'),
    ('Косметика и парфюмерия', 'kosmetika-i-parfyumeriya'),
    ('Инструменты', 'instrumenty')
ON CONFLICT (name) DO NOTHING;
