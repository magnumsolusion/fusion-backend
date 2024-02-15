import express from 'express';
import db from './config/Database.js';
import Users from './models/user.model.js';

import Vendor from './models/vendor.model.js';
import Customer from './models/customer.model.js';
import CustomerContact from './models/customer-contact.model.js';
import ProductCategory from './models/product-category.model.js';
import ProductStock from './models/product-stock.model.js';
import IncomingStuff from './models/incoming-stuff.model.js';
import TermPay from './models/term-pay.model.js';
import Detail from './models/detail.model.js';
import PurchaseOrder from './models/purchase-order.model.js';
import PurchaseOrderProduct from './models/purchase-order-product.model.js';
import PurchaseOrderReceiving from './models/purchase-order-receiving.model.js';
import PurchaseOrderMasterReceiving from './models/purchase-order-master-receiving.model.js';
import PurchaseOrderBarcode from './models/purchase-order-barcode.model.js';
import DirectBuying from './models/direct-buying.model.js';
import DirectBuyingProduct from './models/direct-buying-product.model.js';
import DirectSelling from './models/direct-selling.model.js';
import DirectSellingProduct from './models/direct-selling-product.model.js';
import OutgoingType from './models/outgoing-type.model.js';
import Product from './models/product.model.js';
import Units from './models/units.model.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import Division from './models/division.model.js';
import Menu from './models/menu.model.js';
import Roles from './models/roles.model.js';
import Rolesaction from './models/rolesaction.model.js';
import Usersroles from './models/usersroles.model.js';


dotenv.config();
const app = express();

// Assuming db.authenticate() returns a Promise, wrap it in an async function to use await.
const connectToDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Database Connected');
    // Consider using migrations or explicitly defining schema rather than syncing here.
    await Users.sync({ alter: true });
    await Vendor.sync({ alter: true });
    await Customer.sync({ alter: true });
    await CustomerContact.sync({ alter: true });
    await ProductCategory.sync({ alter: true });
    await Product.sync({ alter: true });
    await ProductStock.sync({ alter: true });
    await Units.sync({ alter: true });
    await IncomingStuff.sync({ alter: true });
    await TermPay.sync({ alter: true });
    await Detail.sync({ alter: true });
    await PurchaseOrder.sync({ alter: true });
    await PurchaseOrderProduct.sync({ alter: true });
    await PurchaseOrderReceiving.sync({ alter: true });
    await PurchaseOrderMasterReceiving.sync({ alter: true });
    await PurchaseOrderBarcode.sync({ alter: true });
    await DirectBuying.sync({ alter: true });
    await DirectBuyingProduct.sync({ alter: true });
    await DirectSelling.sync({ alter: true });
    await DirectSellingProduct.sync({ alter: true });
    await OutgoingType.sync({ alter: true });

    await Roles.sync({ alter: true });
    await Rolesaction.sync({ alter: true });
    await Usersroles.sync({ alter: true });
    await Division.sync({ alter: true });
    await Menu.sync({ alter: true });
  } catch (error) {
    console.error(error);
  }
};

// Call the function to connect to the database
connectToDatabase();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001']
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use('/uploads', express.static('uploads'));
app.use(express.static("public"));
const server = http.createServer(app);

server.listen(5001, () => {
  console.log('Server is running on port 5001');
});
