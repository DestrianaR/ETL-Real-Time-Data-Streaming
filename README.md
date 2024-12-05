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

3. Check services in container
- Control Center
    1. Initial view of the control center
    ![Control Center First Page](/image/Control_Center_First_Page.png)
    The following is an image of the initial interface of Control Center, which I am using with Confluent. In the `Unhealthy Cluster` section there is the number 0 which means there are no cluster errors. Select `controlcenter.cluster`, then `Topics`, and finally click `Create topic`.
    2. Create Topic
    ![Control Center Second Page](/image/Control_Center_Second_Page.png)
    For the Topic name, you can enter the name of your topic. Make sure it matches the topic name used in `producer.py`. In this example, I’m naming it financialtransactions. For Number of Partitions, I’m using 2 partitions to match the number of my Spark workers. You can adjust the number of partitions based on your data volume and requirements. And then select `Create with defaults`.
    ![Control Center Third Page](/image/Control_Center_Third_Page.png)
    Select `Message` menu, and kafka ready to receive message from data source.

- Spark
    1. Initial view of Spark
    To check if the Spark worker is running properly in the container, we can look at the Spark master.
    ![Spark Master First View](/image/Spark_Master_First_View.png)
    It shows that there are already two Spark workers up and running.

- MongoDB
    1. Initial view of MongoDB shell in container
    Enter the MongoDB container to open the mongodb shell.
    ![MongoDB First View](/image/MongoDB_First_View.png)
    In the `init-db` folder, I have created a `mongo_init.js` file to initialize the `admin` database and create a `root` user with global access. Switch db to `transactiondb` and MongoDB ready to receive data from spark.

- Metabase
    1. Setting up an admin account<br>
    The first step is to create an admin account. Just follow the instructions given.
    ![Metabase Connect DB](/image/Metabase_Connect_DB.png)<br>
    In the `Add your data` section, choose MongoDB as the database type and set the Display name to anything you like. To connect the database to Metabase, I use the configuration that has been set in the environment.
    ![Metabase Home](/image/Metabase_Home.png)
    Now the metabase is connected to MongoDB and ready to visualize the data.

4. Run data flow
- Producer<br>
    Change the directory to `kafka_stream`, install all requirements in `requirements.txt` file, and then running `producer.py` script.
    ```bash
    cd kafka_stream
    pip install -r requirements.txt
    python producer.py
    ```

- Control Center<br>
    Once the data is generated, it immediately appears in the control center. I have set the data to continuously produce for 1 hour.
    ![Control Center Data Arrive](/image/Control_Center_Data_Arrive.png)

- Spark<br>
    Now we can run spark with the following spark submit command.
    - PySpark
        ```bash
        docker exec -it spark-master spark-submit --master spark://spark-master:7077 --packages org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1,org.mongodb.spark:mongo-spark-connector_2.12:10.3.0 KafkaSparkStreaming.py
        ```
    The above command runs a Spark application named `KafkaSparkStreaming.py` using `spark-submit` in the `spark-master` container.
    - Scala Spark
        ```bash
        docker exec -it spark-master spark-submit --packages "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.1","org.mongodb.spark:mongo-spark-connector_2.12:10.3.0" --master "spark://spark-master:7077" --class KafkaSparkStreaming --conf spark.jars.ivy=/opt/bitnami/spark/ivy ivy/kafkatomongodb_2.12-1.0.jar
        ```
    After that, you will see the submitted application in the Spark master container.
    ![Spark Master Data Processing](/image/Spark_Master_Data_Processing.png)

- MongoDB and Metabase<br>
    Then the data that has been consumed by Spark will appear in the MongoDB database and Metabase.
    ![Mongodb Data](/image/Mongodb_Data.png)
    ![Metabase Data From Mongodb](/image/Metabase_Data_From_Mongodb.png)
    After the data pipeline runs well, now we can create a visualization.



