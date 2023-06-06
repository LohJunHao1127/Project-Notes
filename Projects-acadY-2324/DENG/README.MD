# Notes for MST

1. One question would generally be based on Primary keys, Foreign Keys
entity integrity rule, relational integrity rule , foreign key rules. 
you will be tested on whether doing something like inserting would violate any rules or if there is an error in the creating table 

2. another question would be about normalization form(NF)
    - From 0 nf to 3 nf
    - remembering the various anomalies for a 1 nf table
    - listing the functional dependencies for a table
    - listing the transitive dependencies for a table
    - listing the the table in relational heading format

3. One question would be about writing sql ranging from select to create to alter 
    - know all the aggregate functions for (GROUP BY/ HAVING)
        - For e.g : COUNT(), SUM(), MIN(), MAX(), AVG()
        - GROUP BY puts the selected attribute together 
            - For e.g - there is a table with the attributes emp_id , name , emp_department and you use GROUP BY emp_department What you are doing with this query is that the rows in the table are divided into **groups**, where each **group** represents a unique value in the emp_department column.
            so if i had sales marketing and HR they would be grouped together into those attributes. 
            ```
                [sales]
                [marketing]
                [HR]
            ```
            Having is similar to where clause but instead for grouped data , rather than  individual rows

4. typically the last question would be about the drawing of the er diagram. it is a enhanced er diagram meaning no many to many.

topic A : Mostly just introductions to data engineering and what type of data there are

topic B : 