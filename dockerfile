#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/src/chat_app

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./ ./

#Expose port
EXPOSE 3000

#command
CMD [ "npm", "run", "pm2" ]
