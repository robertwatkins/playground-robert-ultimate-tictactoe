# 0.4.2

- Fix: add service command does not create recursively the missing directories

# 0.4.1

- Handle default values of the service descriptor 
in request and responses objects of testCases:
   - headers, and
   - cookies.

# 0.4.0

- Make an alias for uriTemplate (urlPattern)
- Handle default values of the service descriptor in case of the following fields:
    - service.style,
    - method.testCases,
    - in request and responses objects:
        - parameters,
        - headers, and
        - cookies.

# 0.3.8

- Fine tuning of service schema and testCase schema.

# 0.3.7

- Add description property to request and response schemas.
- Add array type to request property schema.

# 0.3.6

- Make template generator more generic

# 0.3.5

- Upgrade to should v3.1.2
- Add COLLECTION service type

# 0.3.4

- Add error some error handling to service.load().
- Add test case to check if service.load fails.
- Handle service.load() errors in all test case.

# 0.3.3

- Separate validator schemas into subschemas with dedicated files.
- Refactor the test cases, and remove validator.js.

# 0.3.2

- Modify serviceSchema: notes can be empty strings and testCaseRequests do
not have to define response name and reason.

# 0.3.1

- Complete the service.yml schema and add resource-type service 
description for testing purposes.

# 0.3.0

- Add service descriptor validation to the service module.
- Add config.yml validation to the services module.

# 0.2.2

- Remove TODOs from README and write the about text.

# 0.2.1

- Bugfix: wrong reference to lib modules from index.js

# 0.2.0

- Create JSON schemas for service.yml and serviceConfig.yml.
- Add schema validator to test cases.
- Start creating source code documentation with doxx.
- Move source files to lib folder.

# 0.1.2

- Add test case for services.load()
- Migrate files and update dependencies

# 0.1.1

- First commit
