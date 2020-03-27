FROM node:10
ENV REACT_APP_BACKEND_SERVER='http://localhost:4000'
# Create app directory
WORKDIR /usr/src/twitter/ui
# Install app dependencies
COPY package*.json ./

RUN npm install --silent
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
