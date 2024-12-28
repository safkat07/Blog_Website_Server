# Stationery Shop

### **Objective:**

Develop an Express application using TypeScript, integrating MongoDB with Mongoose to manage a Stationery Shop. Implement Mongoose schema validation to ensure data integrity for **Stationery Products** and **Orders**.

---

### **Project Setup:**

- Initialize an Express project with TypeScript.
- Set up a MongoDB database to store **Stationery Products** and **Orders**.
- Use **Mongoose** for defining schemas and handling data operations.
- Implement **CRUD operations** for managing **Stationery Products** and **Orders**.

---

### **Features:**

- **Stationery Products:**

  - Add new products to the shop.
  - Update existing products.
  - Delete products from the inventory.
  - List all available products.

- **Orders:**

  - Create new orders.
  - List all orders and their details.

- **Data Validation:**
  - Mongoose schema validation for ensuring correct data formats using ZOD.

---

### **Tech Stack:**

- **Node.js & Express** - Backend framework.
- **TypeScript** - JavaScript with static typing.
- **MongoDB** - Database for storing product and order data.
- **Mongoose** - ODM for MongoDB, used to define models and interact with the database.
- **Zod** - For validation of data.

---

### **Installation:**

1. Clone the repository:
   ```bash
   git clone https://github.com/safkat07/Stationery_Shop_Server.git
   ```
2. Navigate to the project directory:

```bash
  cd Stationery-Shop-Server
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:
   *Create a .env file in the root directory.
   *Add your MongoDB connection string.

```bash
    PORT = 5000
   MONGO_URI=your_mongodb_connection_string
```

### **Running Locally::**

1.Start the server:

```bash
npm run start:dev
```

### **API Endpoints:**

#### **Products:**

- `POST /api/products/create-product` - Add a new product.
- `GET /api/products` - Get all products.
- `PUT /api/products/:id` - Update a product by ID.
- `DELETE /api/products/:id` - Delete a product by ID.

#### **Orders:**

- `POST /api/orders` - Create a new order.
- `GET /api/revenue` - Get Revenue.

## Models

### 1. Stationery Product Model

| Field         | Type    | Description                                                            |
| ------------- | ------- | ---------------------------------------------------------------------- |
| `name`        | String  | The name of the product.                                               |
| `brand`       | String  | The brand of the product.                                              |
| `price`       | Number  | The price of the product. Must be positive.                            |
| `category`    | String  | Enum: Writing, Office Supplies, Art Supplies, Educational, Technology. |
| `description` | String  | A brief description of the product.                                    |
| `quantity`    | Number  | Quantity available.                                                    |
| `inStock`     | Boolean | Indicates whether the product is in stock.                             |

### 2. Order Model

| Field        | Type     | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `email`      | String   | Customer's email address.                  |
| `product`    | ObjectId | Reference to the Stationery Product model. |
| `quantity`   | Number   | Quantity of the product ordered.           |
| `totalPrice` | Number   | Calculated as product price \* quantity.   |

## Thank You! 🙏

Thank you for exploring this project! If you have any feedback or suggestions, feel free to open an issue or contribute via pull requests.
