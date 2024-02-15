import express from "express"; 
import { verifyToken } from "../middleware/verify.middleware.js";
import { getUsers, Register, Login, Logout } from "../controllers/user.controller.js";
import { refreshToken } from "../controllers/refreshtoken.controller.js";
import { getVendor, RegisterVendor, deleteVendorById, updateVendorById, getVendorById } from "../controllers/vendor.controller.js";
import { getCustomer, RegisterCustomer, deleteCustomerById, updateCustomerById, getCustomerById } from "../controllers/customer.controller.js";
import { getCustomerContact, RegisterCustomerContact, deleteCustomerContactById, updateCustomerContactById, getCustomerContactById } from "../controllers/customer-contact.controller.js";
import { getProductCategory, RegisterProductCategory, deleteProductCategoryById, updateProductCategoryById, getProductCategoryById } from "../controllers/product-category.controller.js";
import { getUnits, RegisterUnits, deleteUnitsById, updateUnitsById, getUnitsById } from "../controllers/units.controller.js";
import { getProduct, RegisterProduct, deleteProductById, updateProductById, getProductById } from "../controllers/product.controller.js";
import { getProductStockAll, getProductStock, RegisterProductStock, deleteProductStockById, updateProductStockById, getProductStockById } from "../controllers/product-stock.controller.js";
import { getIncomingStuff, RegisterIncomingStuff, deleteIncomingStuffById, updateIncomingStuffById, getIncomingStuffById } from "../controllers/incoming-stuff.controller.js";
import { getTermPay, RegisterTermPay, deleteTermPayById, updateTermPayById, getTermPayById } from "../controllers/term-pay.controller.js";
import { updateDetailById, getDetailById } from "../controllers/detail.controller.js";
import { getPurchaseOrderStatusById, getPurchaseOrder, RegisterPurchaseOrder, deletePurchaseOrderById, updatePurchaseOrderById, getPurchaseOrderById } from "../controllers/purchase-order.controller.js";
import { getPurchaseOrderProductByIdSum, RegisterPurchaseOrderProductEdit, getPurchaseOrderProductEdit, getPurchaseOrderProduct, RegisterPurchaseOrderProduct, deletePurchaseOrderProductById, updatePurchaseOrderProductById, getPurchaseOrderProductById } from "../controllers/purchase-order-product.controller.js";
import { RegisterPurchaseOrderReceivingMaster, getPurchaseOrderReceivingByIdSum, RegisterPurchaseOrderReceivingEdit, getPurchaseOrderReceivingEdit, getPurchaseOrderReceivingEdit2, getPurchaseOrderReceiving, RegisterPurchaseOrderReceiving, deletePurchaseOrderReceivingById, updatePurchaseOrderReceivingById, getPurchaseOrderReceivingById } from "../controllers/purchase-order-receiving.controller.js";
import { getPurchaseOrderMasterReceivingStatusById, getPurchaseOrderMasterReceiving, RegisterPurchaseOrderMasterReceiving, deletePurchaseOrderMasterReceivingById, updatePurchaseOrderMasterReceivingById, getPurchaseOrderMasterReceivingById } from "../controllers/purchase-order-master-receiving.controller.js";
import { getPurchaseOrderBarcodeAll2Edit, getPurchaseOrderBarcodeAll2, getPurchaseOrderBarcodeAll, RegisterPurchaseOrderBarcodeMaster, getPurchaseOrderBarcodeByIdSum, RegisterPurchaseOrderBarcodeEdit, getPurchaseOrderBarcodeEdit, getPurchaseOrderBarcode, RegisterPurchaseOrderBarcode, deletePurchaseOrderBarcodeById, updatePurchaseOrderBarcodeById, getPurchaseOrderBarcodeById, getPurchaseOrderBarcodeBuyingById } from "../controllers/purchase-order-barcode.controller.js";
import { getDirectBuyingStatusById, getDirectBuyingLastId, getDirectBuying, RegisterDirectBuying, deleteDirectBuyingById, updateDirectBuyingById, getDirectBuyingById } from "../controllers/direct-buying.controller.js";
import { getDirectBuyingProductByIdSum, RegisterDirectBuyingProductEdit, getDirectBuyingProductEdit, getDirectBuyingProduct, RegisterDirectBuyingProduct, deleteDirectBuyingProductById, updateDirectBuyingProductById, getDirectBuyingProductById } from "../controllers/direct-buying-product.controller.js";
import { getDirectSellingLastId, getDirectSellingStatusById, getDirectSelling, RegisterDirectSelling, deleteDirectSellingById, updateDirectSellingById, getDirectSellingById } from "../controllers/direct-selling.controller.js";
import { getDirectSellingProductByIdSum, RegisterDirectSellingProductEdit, getDirectSellingProductEdit, getDirectSellingProduct, RegisterDirectSellingProduct, deleteDirectSellingProductById, updateDirectSellingProductById, getDirectSellingProductById } from "../controllers/direct-Selling-product.controller.js";
import { getOutgoingType, RegisterOutgoingType, deleteOutgoingTypeById, updateOutgoingTypeById, getOutgoingTypeById } from "../controllers/outgoing-type.controller.js";




const router = express.Router();

//for user
router.get('/users', getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

//for vendor
router.post('/api/registerVendor', RegisterVendor);
router.get('/api/getVendor/', getVendor);
router.get('/api/getVendorById/:id', getVendorById);
router.delete('/api/deleteVendor/:id', deleteVendorById);
router.patch('/api/updateVendor/:id', updateVendorById);

//for customer
router.post('/api/registerCustomer', RegisterCustomer);
router.get('/api/getCustomer/', getCustomer);
router.get('/api/getCustomerById/:id', getCustomerById);
router.delete('/api/deleteCustomer/:id', deleteCustomerById);
router.patch('/api/updateCustomer/:id', updateCustomerById);

//for CustomerContact
router.post('/api/registerCustomerContact', RegisterCustomerContact);
router.get('/api/getCustomerContact/:id', getCustomerContact);
router.get('/api/getCustomerContactById/:id', getCustomerContactById);
router.delete('/api/deleteCustomerContact/:id', deleteCustomerContactById);
router.patch('/api/updateCustomerContact/:id', updateCustomerContactById);

//for ProductCategory
router.post('/api/registerProductCategory', RegisterProductCategory);
router.get('/api/getProductCategory/', getProductCategory);
router.get('/api/getProductCategoryById/:id', getProductCategoryById);
router.delete('/api/deleteProductCategory/:id', deleteProductCategoryById);
router.patch('/api/updateProductCategory/:id', updateProductCategoryById);

//for Unis
router.post('/api/registerUnits', RegisterUnits);
router.get('/api/getUnits/', getUnits);
router.get('/api/getUnitsById/:id', getUnitsById);
router.delete('/api/deleteUnits/:id', deleteUnitsById);
router.patch('/api/updateUnits/:id', updateUnitsById);

//for Product
router.post('/api/registerProduct', RegisterProduct);
router.get('/api/getProduct/', getProduct);
router.get('/api/getProductById/:id', getProductById);
router.delete('/api/deleteProduct/:id', deleteProductById);
router.patch('/api/updateProduct/:id', updateProductById);

//for product stock
router.get('/api/getProductStockAll', getProductStockAll);
router.post('/api/registerProductStock', RegisterProductStock);
router.get('/api/getProductStock/:id', getProductStock);
router.get('/api/getProductStockById/:id', getProductStockById);
router.delete('/api/deleteProductStock/:id', deleteProductStockById);
router.patch('/api/updateProductStock/:id', updateProductStockById);

//for incoming stuff
router.post('/api/registerIncomingStuff', RegisterIncomingStuff);
router.get('/api/getIncomingStuff/', getIncomingStuff);
router.get('/api/getIncomingStuffById/:id', getIncomingStuffById);
router.delete('/api/deleteIncomingStuff/:id', deleteIncomingStuffById);
router.patch('/api/updateIncomingStuff/:id', updateIncomingStuffById);

//for TermPay
router.post('/api/registerTermPay', RegisterTermPay);
router.get('/api/getTermPay/', getTermPay);
router.get('/api/getTermPayById/:id', getTermPayById);
router.delete('/api/deleteTermPay/:id', deleteTermPayById);
router.patch('/api/updateTermPay/:id', updateTermPayById);

//for detail
router.get('/api/getDetail', getDetailById);
router.patch('/api/updateDetail', updateDetailById);

//for PurchaseOrder
router.post('/api/registerPurchaseOrder', RegisterPurchaseOrder);
router.get('/api/getPurchaseOrder/', getPurchaseOrder);
router.get('/api/getPurchaseOrderById/:id', getPurchaseOrderById);
router.delete('/api/deletePurchaseOrder/:id', deletePurchaseOrderById);
router.patch('/api/updatePurchaseOrder/:id', updatePurchaseOrderById);
router.get('/api/getPurchaseOrderStatusById/:id', getPurchaseOrderStatusById);


//for PurchaseOrderProduct
router.post('/api/registerPurchaseOrderProduct', RegisterPurchaseOrderProduct);
router.get('/api/getPurchaseOrderProduct/', getPurchaseOrderProduct);
router.get('/api/getPurchaseOrderProductById/:id', getPurchaseOrderProductById);
router.delete('/api/deletePurchaseOrderProduct/:id', deletePurchaseOrderProductById);
router.patch('/api/updatePurchaseOrderProduct/:id', updatePurchaseOrderProductById);
router.get('/api/getPurchaseOrderProductEdit/:id', getPurchaseOrderProductEdit);
router.post('/api/RegisterPurchaseOrderProductEdit', RegisterPurchaseOrderProductEdit);
router.get('/api/getPurchaseOrderProductByIdSum/:id', getPurchaseOrderProductByIdSum);

//for PurchaseOrderReceiving
router.post('/api/registerPurchaseOrderReceiving', RegisterPurchaseOrderReceiving);
router.get('/api/getPurchaseOrderReceiving/', getPurchaseOrderReceiving);
router.get('/api/getPurchaseOrderReceivingById/:id', getPurchaseOrderReceivingById);
router.delete('/api/deletePurchaseOrderReceiving/:id', deletePurchaseOrderReceivingById);
router.patch('/api/updatePurchaseOrderReceiving/:id', updatePurchaseOrderReceivingById);
router.get('/api/getPurchaseOrderReceivingEdit/:id', getPurchaseOrderReceivingEdit);
router.get('/api/getPurchaseOrderReceivingEdit2/:id', getPurchaseOrderReceivingEdit2);
router.post('/api/RegisterPurchaseOrderReceivingEdit', RegisterPurchaseOrderReceivingEdit);
router.post('/api/RegisterPurchaseOrderReceivingMaster', RegisterPurchaseOrderReceivingMaster);
router.get('/api/getPurchaseOrderReceivingByIdSum/:id', getPurchaseOrderReceivingByIdSum);



//for PurchaseOrderMasterReceiving
router.post('/api/registerPurchaseOrderMasterReceiving', RegisterPurchaseOrderMasterReceiving);
router.get('/api/getPurchaseOrderMasterReceiving/', getPurchaseOrderMasterReceiving);
router.get('/api/getPurchaseOrderMasterReceivingById/:id', getPurchaseOrderMasterReceivingById);
router.delete('/api/deletePurchaseOrderMasterReceiving/:id', deletePurchaseOrderMasterReceivingById);
router.patch('/api/updatePurchaseOrderMasterReceiving/:id', updatePurchaseOrderMasterReceivingById);
router.get('/api/getPurchaseOrderMasterReceivingStatusById/:id', getPurchaseOrderMasterReceivingStatusById);

//for Purchase Order Barcode
router.post('/api/registerPurchaseOrderBarcode', RegisterPurchaseOrderBarcode);
router.get('/api/getPurchaseOrderBarcode/', getPurchaseOrderBarcode);
router.get('/api/getPurchaseOrderBarcodeAll/', getPurchaseOrderBarcodeAll);
router.get('/api/getPurchaseOrderBarcodeAll2/', getPurchaseOrderBarcodeAll2);
router.get('/api/getPurchaseOrderBarcodeById/:id', getPurchaseOrderBarcodeById);
router.delete('/api/deletePurchaseOrderBarcode/:id', deletePurchaseOrderBarcodeById);
router.patch('/api/updatePurchaseOrderBarcode/:id', updatePurchaseOrderBarcodeById);
router.get('/api/getPurchaseOrderBarcodeEdit/:id', getPurchaseOrderBarcodeEdit);
router.post('/api/RegisterPurchaseOrderBarcodeEdit', RegisterPurchaseOrderBarcodeEdit);
router.post('/api/RegisterPurchaseOrderBarcodeMaster', RegisterPurchaseOrderBarcodeMaster);
router.get('/api/getPurchaseOrderBarcodeByIdSum/:id', getPurchaseOrderBarcodeByIdSum);
router.get('/api/getPurchaseOrderBarcodeBuyingById/:id', getPurchaseOrderBarcodeBuyingById);
router.get('/api/getPurchaseOrderBarcodeAll2Edit/:id', getPurchaseOrderBarcodeAll2Edit);





//for DirectBuying
router.post('/api/registerDirectBuying', RegisterDirectBuying);
router.get('/api/getDirectBuying/', getDirectBuying);
router.get('/api/getDirectBuyingLastId/', getDirectBuyingLastId);
router.get('/api/getDirectBuyingById/:id', getDirectBuyingById);
router.delete('/api/deleteDirectBuying/:id', deleteDirectBuyingById);
router.patch('/api/updateDirectBuying/:id', updateDirectBuyingById);
router.get('/api/getDirectBuyingStatusById/:id', getDirectBuyingStatusById);


//for DirectBuyingProduct
router.post('/api/registerDirectBuyingProduct', RegisterDirectBuyingProduct);
router.get('/api/getDirectBuyingProduct/', getDirectBuyingProduct);
router.get('/api/getDirectBuyingProductById/:id', getDirectBuyingProductById);
router.delete('/api/deleteDirectBuyingProduct/:id', deleteDirectBuyingProductById);
router.patch('/api/updateDirectBuyingProduct/:id', updateDirectBuyingProductById);
router.get('/api/getDirectBuyingProductEdit/:id', getDirectBuyingProductEdit);
router.post('/api/RegisterDirectBuyingProductEdit', RegisterDirectBuyingProductEdit);
router.get('/api/getDirectBuyingProductByIdSum/:id', getDirectBuyingProductByIdSum);



//for DirectSelling
router.post('/api/registerDirectSelling', RegisterDirectSelling);
router.get('/api/getDirectSelling/', getDirectSelling);
router.get('/api/getDirectSellingById/:id', getDirectSellingById);
router.delete('/api/deleteDirectSelling/:id', deleteDirectSellingById);
router.patch('/api/updateDirectSelling/:id', updateDirectSellingById);
router.get('/api/getDirectSellingStatusById/:id', getDirectSellingStatusById);
router.get('/api/getDirectSellingLastId/', getDirectSellingLastId);



//for DirectSellingProduct
router.post('/api/registerDirectSellingProduct', RegisterDirectSellingProduct);
router.get('/api/getDirectSellingProduct/', getDirectSellingProduct);
router.get('/api/getDirectSellingProductById/:id', getDirectSellingProductById);
router.delete('/api/deleteDirectSellingProduct/:id', deleteDirectSellingProductById);
router.patch('/api/updateDirectSellingProduct/:id', updateDirectSellingProductById);
router.get('/api/getDirectSellingProductEdit/:id', getDirectSellingProductEdit);
router.post('/api/RegisterDirectSellingProductEdit', RegisterDirectSellingProductEdit);
router.get('/api/getDirectSellingProductByIdSum/:id', getDirectSellingProductByIdSum);


//for OutgoingType
router.post('/api/registerOutgoingType', RegisterOutgoingType);
router.get('/api/getOutgoingType/', getOutgoingType);
router.get('/api/getOutgoingTypeById/:id', getOutgoingTypeById);
router.delete('/api/deleteOutgoingType/:id', deleteOutgoingTypeById);
router.patch('/api/updateOutgoingType/:id', updateOutgoingTypeById);




export default router;