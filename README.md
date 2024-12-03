# ETL Real-Time Data Streaming Pipeline

![Data Architecture](/Image/Data_Architecture.jpg)

## Project Overview
A real-time data streaming pipeline that processes transaction data using Kafka, Spark (both PySpark and Scala), MongoDB, and visualizes insights using Metabase. This project demonstrates the integration of data engineering tools for end-to-end streaming, storage, and analytics.

## Table of Content
1. [Project Features](#ProjectFeatures)
2. [Tecnologies Used](#TecnologiesUsed)
3. [Setup and Installation](#SetupandInstallation)
4. [Pipeine Workflow](#PipeineWorkflow)
5. [How To Run](#HowToRun)
6. [Key Result and Visualizations](#KeyResultandVisualizations)

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