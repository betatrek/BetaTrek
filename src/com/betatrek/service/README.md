# Services

1. Bcrypt
2. Email Validator
3. Unique User Identifier Generator

# Bcrypt

This class can perform secure one-way encryption ideal for store user passwords. It is implemented to be slow to compute making it a hard target for brute force cracking. And it comes with a method for checking an unecrypted string agains the encrypted string. **This is around because I do not know if we will be able to implement the same functionality with PHP alone** 

# Email Validator

This class can perform RFC-compliant email validation on a string. If it is deemed invalid, it should not be a valid email address in any domain. Possible extensions could be to add functionality to validate emails on specific domains as well, as they are usually more restrictive. **This is around because I have not yet confirmed how thorough the PHP email validation implementation is, though I suspect (or hope) that it is at worst on par with something I threw together myself**

# Unique User Identifier Generator

This class generates securely randomly generated identifiers to associate with a user. It is implemented to be difficult to guess the pattern of genreation to be able to predict other used IDs, even after seeing the generator produce a sequence of IDs. This is currently in use, and unless someone knows how to get a persistent object in PHP to perform this functionality, it will remain in use.
