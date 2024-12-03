# ETL Real-Time Data Streaming Pipeline

![Data Architecture](/image/Data_Architecture.jpg)

## Project Overview
In this project I created a real-time data stream that handles transactional data using Kafka, Spark (with PySpark and Scala), MongoDB, and displays insights with Metabase. This project shows how various tools work together to stream, store, and analyze data.

## Table of Content
1. [Project Features](#ProjectFeatures)
2. [Tecnologies Used](#TecnologiesUsed)
3. [How To Run](#HowToRun)
4. [Key Result and Visualizations](#KeyResultandVisualizations)

## Project Features
- Real-Time Data Generation: Simulated transaction data using Python's Faker library.
- Kafka Integration: Transaction data is produced and consumed through Kafka brokers.
    - Zookeeper: Used for Kafka metadata coordination and management.
    - Control Center: GUI based tool for visually monitoring and managing Kafka.
    - Schema Registry: Managed the data schema to ensure validity and compatibility between Kafka producers and consumers.
- Spark Streaming: Real-time data processing with Spark Structured Streaming using PySpark and Scala.
- Data Storage: Processed data stored in MongoDB for querying and further analysis.
- Data Visualization: Insights and KPIs visualized in Metabase dashboards.

## Technologies Used
- Data Streaming:Apache Kafka
- Data Processing: Apache Spark (PySpark & Scala)
- Database: MongoDB
- Visualization: Metabase
- Orchestration: Docker & Docker Compose 

## How To Run
### Steps
1. Clone this repository:
```bash
    git clone https://github.com/DestrianaR/ETL-Real-Time-Data-Streaming-Kafka-Spark-MongoDB-Metabase.git
    cd ETL-Real-Time-Data-Streaming-Kafka-Spark-MongoDB-Metabase
```
2. Build and start the Docker containers:
- For PySpark
```bash
        docker-compose -f docker-compose_py.yml up
```
- For Scala
```bash
        docker-compose -f docker-compose_sc.yml up
```
Make sure all containers are running well

3. Check container
- Control Center
    1. Initial view of the control center
    ![Control Center First Page](/image/Control_Center_First_Page.png)
    The following is an image of the initial interface of Control Center, which I am using with Confluent. In the `Unhealthy Cluster` section there is the number 0 which means there are no cluster errors. Select `CONTROLCENTER.CLUSTER`, then `Topics`, and finally click `Create topic`.
    2. Create Topic
    ![Control Center First Page](/image/Control_Center_Second_Page.png)
    For the Topic name, you can enter the name of your topic. Make sure it matches the topic name used in `producer.py`. In this example, I’m naming it financialtransactions. For Number of Partitions, I’m using 2 partitions to match the number of my Spark workers. You can adjust the number of partitions based on your data volume and requirements. And then select `Create with defaults`.
- MongoDB
    1. Initial view of MongoDB container database
    ![MongoDB First View](/image/MongoDB_First_View.png)
    In the `init-db` folder, I have created a `mongo_init.js` file to initialize the `admin` database and create a `root` user with global access.
- Metabase
    1. 

