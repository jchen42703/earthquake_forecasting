# pull the base image
FROM node:16

# RUN apt update -qq && apt install -y build-essential

ENV PORT=3006
ENV REACT_APP_API_PORT=5001

# set the working direction
WORKDIR /app


# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install


# add app
COPY . ./

# start app
CMD ["npm", "start"]