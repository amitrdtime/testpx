const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Client-Service:Resources
 *   description: API for managing Resources
 */

/**
 * @swagger
 * /client-service/resources:
 *   get:
 *     summary: Get all the resources with details
 *     tags: [Client-Service:Resources]
 *     description: Retrieve details of resources like project manager, vendor, etc.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The auto generated id of the resource.
 *                   resourceNo:
 *                     type: string
 *                     description: The unique identifier of the resource.
 *                   resourceName:
 *                     type: string
 *                     description: The name of the resource.
 *                   resourceEmailID:
 *                     type: string
 *                     description: The Email ID of the resource.
 *                   resourceType:
 *                     type: string
 *                     description: The type of resource.
 *                   vendorNo:
 *                     type: string
 *                     description: The vendor's unique identifier.
 *                   vendorName:
 *                     type: string
 *                     description: The name of the vendor.
 *                   resourceGroup:
 *                     type: string
 *                     description: The resource group name.
 *                   resourceGroupCategory:
 *                     type: string
 *                     description: The category of the resource group.
 *                   unitCost:
 *                     type: number
 *                     format: float
 *                     description: The unit cost of the resource.
 *                   priceProfitCalculation:
 *                     type: number
 *                     format: float
 *                     description: The calculations related to price and profit.
 *                   profitPercent:
 *                     type: number
 *                     format: float
 *                     description: The profit percentage.
 *                   unitPrice:
 *                     type: number
 *                     format: float
 *                     description: The unit price of the resource.
 *                   baseUnitOfMeasure:
 *                     type: string
 *                     description: The basic unit of measure of the resource.
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: The end date for the resource.
 *                   createdAt:
 *                     type: string
 *                     format: date
 *                     description: Date when the resource was created.
 *                   createdBy:
 *                     type: string
 *                     description: User who created the resource.
 *                   updatedAt:
 *                     type: string
 *                     format: date
 *                     description: Date when the resource was last modified.
 *                   modifiedBy:
 *                     type: string
 *                     description: User who last modified the resource.
 *             example:
 *               - id: 1
 *                 resourceNo: "R001"
 *                 resourceName: "Resource 1"
 *                 resourceEmailID: "Resource1@innove.com"
 *                 resourceType: "Project Manager"
 *                 vendorNo: "V001"
 *                 vendorName: "Vendor 1"
 *                 resourceGroup: "Group A"
 *                 resourceGroupCategory: "Category 1"
 *                 unitCost: 150.00
 *                 priceProfitCalculation: 200.00
 *                 profitPercent: 33.33
 *                 unitPrice: 250.00
 *                 baseUnitOfMeasure: "Hour"
 *                 endDate: "2025-12-31"
 *                 createdAt: "2023-09-10"
 *                 createdBy: "Admin"
 *                 updatedAt: "2023-10-01"
 *                 modifiedBy: "Admin"
 *       404:
 *         description: No resources found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resources not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */

router.get('/');

module.exports = router;