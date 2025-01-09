## BoolBnB
# users table
- id: int no null AI PK
- name:  varchar(50) no null
- surname: varchar(200) no null
- userName: varchar(150) no null
- password: varchar(150) no null
- email:    varchar(150) no null
- phone: varchar(20) no null
- type: char(2) no null

# properties table
- id: int no null AI PK
- id_user: int no null FK
- name: varchar(50) no null
- rooms: tinyint no null
- beds: tinyint no null
- bathrooms: tinyint no null
- m^2: smallint no null
- address: varchar(200) no null
- email_owners: varchar(150) no null
- like: smallint no null
- image: varchar(100) null


# reviews table
- id: int no null AI PK
- id_user: int no null FK
- id_property: int no null FK
- text_review: text(500) no null
- date_review: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- nights: tinyint no null

# messages table
- id: int no null AI PK
- id_user: int no null FK
- id_property: int no null FK
- text_message: text(500) no null
- date_message: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

# properties_services table
- id_service: int no null FK
- id_property: int no null FK

# services table
- id: int no null AI PK
- name: varchar(50) no null FK