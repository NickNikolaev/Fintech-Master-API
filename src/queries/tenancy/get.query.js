const generateGetTenancyByDomainQuery = (domain) => `CALL ECHO_DEV.MILEMARKER.CUSTOMER_VERIFY_POST('${domain}')`;

module.exports = {
  generateGetTenancyByDomainQuery,
};
