Below is the technical documentation for MMRCL Project.

The techstack used for this proejct is mentioned below.

1. Front end is maintained using openlayers react.
2. Backend is maintained using geoserver and django rest framework.
3. Database is maintained using POSTGRESQL.

The portal is maintained into modules which are mentioned below.

1. Mappart - /home - This part maintains the map related layers which has TileLayer, VectorTileLayer
   and VectorLayer.(TileLayer is used to provide SLD, VectorTileLayer is used to display the attribute information, VectorLayer is used to display the data using GEOJSON).
   It has features to display features such as
   i.the layers and information and edit the attributes.
   ii.display the legends of the layers and display map and drone images
   iii.map with controls to zoom in and out and display the scale , latitude and longitude,and zoom to extent.
   iv.spatial queries , non spatial queries, draw and measure tools
   v.upload shape files and publish the relevant layer.(also added an option to delete the layer)
   vi.predefined queries to display the relevant data.

2. Usermanagement - /Usermanagement -
   This part has various features which are mentioned below.
   i.User Registeration - To register a new user.
   ii.User Management -Data here can be filtered based upon permission and data can be downloaed in csv.
   iii.User Logs - This part is used to maintain user logs with filters such as active user, deleted user. It has actions to create,update and delete and all of the data can be downloaded in the form of CSV file.
   iv. Layer History - This part is used to maintain the layers with the crud operations and can filter the data in csv format.
   v. Uploaded Files History - This part is used to maintain the uploaded layers history with the crud operations and can filter the data in csv format.
   vi. Feedback Management - This part is used to maintain the feedback submitted by the users and can respond the users
   via email address.

3. About us - /about
   This part is about us page which displays information relevan to MMRCL project.

4. Contact us - This displays contact information.
