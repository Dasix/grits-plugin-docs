--- 
pdf: true
subject: SMCL Training System
title: Project Outline and Proposal
section: tests
order: 4006
debugMarkdown: false
document:
  Authors:
    - Luke Chavers <luke@dasix.com>
    - Without Email
    - Name: Asan Object
      Email: <luke@chavers.io>
    - name: Object Noemail
    - name: Nobrackets Inemail
      email: luke@chavers.io
  Creation Date: Sep 15, 2015 
  Revision: 8
  Revision Date: Sep 21, 2015
---  

# H1 Test
This is a line of text... 
## H2 Test
This is a line of text... 
### H3 Test
This is a line of text... 
#### H4 Test
This is a line of text... 
##### H5 Test
This is a line of text... 
###### H6 Test
This is a line of text... 

# H1 Test
## H2 Test
### H3 Test
#### H4 Test
##### H5 Test
###### H6 Test

# Foreward
## Abstract
This document is a software proposal from Company Awesome, LLC intended to outline the features 
and costs of new software development. This document supersedes any formal, informal, 
written, or unwritten proposals that Company has submitted, discussed, or implied for the topic 
mentioned herein.

## Disclaimer
This document is not a contract and does not obligate Company Awesome, LLC to any performance 
of any software development or any related activity. Should this proposal be accepted, work 
will not commence until a formal contract has been drafted and signed by both parties. This 
proposal, its terms, and the cost estimates herein shall be considered as valid for not more 
than 15 days following the "revision date" shown on the cover page.
This proposal shall not be subdivided, itemized, or otherwise altered in any way without the 
express written permission of Company Awesome, LLC.

## Conventional Notes
The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", 
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be 
interpreted as described in RFC 2119.
A copy of RFC 2119 can be found at the following URL:
https://www.ietf.org/rfc/rfc2119.txt

# Introduction
Company Awesome, LLC (hereinafter "Company") received a formal RFP from the Federation of 
Pet Owner Associations (hereinafter "SMCL") regarding its desire to develop (or 
otherwise implement) a new system for administering trainings on behalf of its member 
associations to its athletic officials.

After reviewing the RFP and all of its specifications, Company has devised three possible 
alternatives for how it could satisfy the perceived intent of the RFP document. What follows 
are those three proposals; each proposal is accompanied by the advantages and 
disadvantages of the associated methodology.

The "Primary Proposal" represents Company’s preferred approach to the RFP as it best conforms 
with Company’s existing development methodologies, requires the least amount of up-front 
expense, requires the least amount of time and effort by the SMCL, and has the shortest
turnaround time.

# Proposal 1: Primary
## Proposal Summary

Company has spent the last seven years creating the most robust pet management platform 
in the world (website.com). This system has been tested and hardened by  tens of 
thousands of users, millions of visitors, and has been proven to scale efficiently to radical 
fluctuations in traffic and back-end workloads.

Within this system Company has already created a robust and feature-rich "trainings" component 
that is used by thousands of pet owners, teams, and coaches for compliance with the rules and 
regulations imposed by Company’s sanctioning association clients.

This system exists, today, and covers virtually all of the requirements outlined by the RFP. 
With minimal effort this system can be extended for use by the SMCL.

However, the Company system is "multi-tenant"; it was created to facilitate the needs of multiple 
stakeholders and, as such, it can only operate on the Company infrastructure. The existing source 
code is proprietary and is the intellectual property of Company.

In understanding that the SMCL has had difficulty with solutions of this type in the past, Company 
is open to licensing options that may alleviate some of the SMCL’s concerns, including (but 
not limited to):

* Multi-year licensing; including price lock-ins
* Optional SLA provisions for guaranteed up-time
* Optional white labeling
* Optional, limited, source code licensing
* Pay-per-use pricing

**Note:** This proposal is not a subscription. The SMCL would pay an up-front, non-refundable, 
fee for the custom development required to modify the existing software and would then pay 
for each test taken in accordance with the "Usage Fees" outlined. The SMCL could exit the 
agreement at any time by simply discontinuing usage and would not be penalized.

## Advantages (versus alternate proposals) 

* Fastest turn-around; can be online within weeks
* Minimal custom development required
* Proven under extraordinary traffic loads
* Company assumes 100% of the network and compute burden
* After setup you pay only for what you use

## Disadvantages (versus alternate proposals)

* Company retains full ownership
* Direct database access is not available

## Deliverables 

* Access and usage information

## Included in Price 

* All maintenance is fully covered by usage fees
* 100% of all network expenses are covered
* 100% of all compute expenses are covered
* Unlimited, qualifying, custom development*
* Discounted rates on non-qualifying custom development*
* Unlimited updates, bug fixes, and incremental improvements*
* Unlimited user support (support tickets, email, forums, knowledge base)
* Support center seats for SMCL staff (up to 1 per 1,000 tests/mo)
* Administrative access for all SMCL staff (reporting, analytics, management)

### "Qualifying Development"

Development that improves upon the software in a way that is beneficial to multiple Company
clients will be developed, without charge, and included automatically as part of your base 
contract rate.  Qualifying development must be approved by Company and all development 
schedules and timelines for qualifying development will be at Company’s sole discretion unless 
"expedited". 

## Fixed Costs (One-Time)
Item                               | Qty | Rate   | Total
---------------------------------- | --: | -----: | -------:
Custom Development (Initial Setup) | 160 | $0.00 | $0

## Usage Fees (Billed Monthly)
Tests Taken (in billing month) | Price Each
------------------------------ | ------------:
Less than 1,000 Tests          |       $0.00
1,000 – 10,000 Tests           |       $0.00
10,000 – 50,000 Tests          |       $0.00
50,000+ Tests                  |       $0.00

*** 

## Additional Options
Item                           | Unit       | Rate
------------------------------ | :--------: | --------:
Maintenance                    | Each       | Included   
Payment processing _$0.00 minimum fee per transaction_ | Each | 5%
Custom Development _For non-qualifying development_ | Hour | $0.00
Expedited Development _For qualifying development_ | Hour | $0.00
End-User Phone Support | 15 min | $0.00 
Training (up to 20 attendees) _All expenses are included in training rate_ | Day | $0.00
REST API Access (for internal/state use) _Includes 10GB of transfer, rate limits apply_ | Month | $0.00
REST API Access (for third party use) _Includes 1GB of transfer_ | Month | $0.00
REST API Transfer | GB | $0.00
SLA w/ 95% Up-time Guarantee _Excludes scheduled maintenance_ | Month | $0.00
SLA w/ 99% Up-time Guarantee _Excludes scheduled maintenance_ | Month | $0.00

# Proposal 2: Alternate A
## Proposal Summary
Company can develop a custom application for use by the SMCL. It can be hosted by the SMCL on 
its own servers, full source code will be made available, and the SMCL will have unlimited 
rights to the software and its usages.

Company expects that the methodologies proposed in this alternate will be the same or similar to 
virtually all proposals that the SMCL receives and considers it as the most basic offering. The 
goal of this proposal is to minimize custom development and allow the SMCL the most 
control and ownership of the software as is possible.

In order to reduce the amount of custom development required, Company will construct the 
software as a plugin for a popular, open source, content management system (such as 
Joomla, but targeted for the Node.js platform) and will use Twitter Bootstrap to ensure 
mobile/tablet compatibility.

## Advantages (over primary proposal)
* SMCL will own the software, all associated intellectual property, and will be free to use 
the software as they see fit.
* Development will be relatively inexpensive
* Direct database access will be available to the SMCL
Disadvantages (over primary proposal)
* Requires more custom development
* SMCL assumes all network & infrastructure expenses
* SMCL assumes all compute and server expenses
* Tested, but relatively unproven, architecture
* Up-time guarantees are not available
* More expensive support (if provided by Company, which is optional)

## Deliverables
* Full source code (AWS CodeCommit)
* Fully configured AWS AMI (AWS EC2)
* VM Run Configuration (AWS EC2)
* Database access info (AWS RDS & DynamoDB)
* Software usage information as PDF

## Included in Price
* All custom development required to meet RFP requirements
* All related development and demonstration expenses
* Unlimited bug fixes for defective software during selected maintenance period
* Two demonstrations of the software at pre-determined milestones
Exclusions
* SMCL must provide AWS access information and all development assets (RDS 
database, EC2 instances, etc, will not exceed $0.00/mo )
* End-User support is not included, but is available
* Software updates (improvements, new features, bugs beyond maintenance contract) 
are not included, but may be purchased by the development hour
* Maintenance contracts are not renewable and only include defective software fixes
* Architecture performance and scalability cannot be guaranteed

---

## Fixed Costs (One-Time)
Item | Qty | Rate | Total
---- | --: | ---: | ----:
Custom Development | 450 | $0.00 | $0
Maintenance Contract (30 days) _Includes unlimited bug fixes and up to 8 custom development hours_ | 1 | $0 | $0
Maintenance Contract (60 days) _Includes unlimited bug fixes and up to 20 custom development hours_ | 1 | $0 | $0 
Maintenance Contract (90 days) _Includes unlimited bug fixes and up to 40 custom development hours_ | 1 | $0 | $0

---

## Additional Options
Item | Unit / Per | Rate
---- | :--------: | -----:
Custom Development (Junior Developer) | Hour | $0.00
Custom Development (Senior Developer) | Hour | $0.00
Architecture / Systems Support | Hour | $0.00
End-User Phone Support | 15 min | $0.00
Training (up to 20 attendees) _All expenses are included in training rate_ | Day | $0.00
Payment processing | Each | Not Available
Expedited Development _For qualifying development_ | Hour | Not Applicable
REST API | Month | Not Available
SLA w/ Up-time Guarantee | Month | Not Available 

# Proposal 3: Alternate B
## Proposal Summary

Alternate B is also a custom development solution that will be principally owned by the 
SMCL, but operated by Company on the SMCL net. Company believes that while "Alternate A" 
is the approach that most software vendors will promote, it will have substantial 
sustainability issues and will require an enormous amount of SMCL time, energy, and expense.

It is Company’s opinion that the SMCL should not need to be a software or infrastructure/hosting 
company in order to provide its members will valuable software. While the "primary" 
proposal remains Company’s preference and recommendation, this alternate expresses what Co 
believes is the true cost (development, infrastructure upkeep and maintenance, scaling, 
support) of operating a software title of this type, scale, and capacity. 
Unlike "Alternate A", the software outlined in this alternate will be built from scratch and will 
not depend on any existing CMS software (but may include various open-source libraries).

## Advantages (over primary proposal)
* SMCL will own the software, all associated intellectual property, and will be free to use 
the software as they see fit.
* Direct database access will be available to the SMCL
* Infrastructure & Up-time can be guaranteed (via SLA guarantees)

## Disadvantages (over primary proposal)
* Requires the most custom development
* SMCL assumes all network & infrastructure expenses
* SMCL assumes all compute & server expenses

## Deliverables
* Full source code (AWS CodeCommit)
* Fully configured AWS AMI (AWS EC2)
* VM Run Configuration (AWS EC2)
* Database access info (AWS RDS & DynamoDB) 
* Software usage information as PDF

## Included in Price
* All custom development required to meet RFP requirements
* All related development and demonstration expenses
* Unlimited bug fixes for defective software during selected maintenance period

## Exclusions
* SMCL must provide AWS access information and all development assets (RDS 
database, EC2 instances, etc, will not exceed $0.00/mo )
* End-User support is not included, but is available
* Software updates (improvements, new features, bugs beyond maintenance contract) 
are not included, but may be purchased by the development hour

--- 

## Fixed Costs (One-Time)
Item | Qty | Rate | Total
---- | --: | ---: | ------:
Custom Development | 3,000 | $0.00 | $0
Maintenance Contract (1 year) _**Required:** Includes unlimited bug fixes, up to 20 custom development hours, and up to 20 systems admin hours._ | 1 | $0 | $0

---

## Additional Options
Item | Unit / Per | Rate
---- | :--------: | -------:
Payment processing _$0.00 minimum fee per transaction_ | Each | 5%
Custom Development _Beyond maintenance contract limits_ | Hour | $0.00
End-User Phone Support | 15 min | $0.00 
Training (up to 20 attendees) _All expenses are included_ | Day | $0.00
REST API Access | Month | Included
REST API Transfer | GB | AWS Rates
SLA w/ 95% Up-time Guarantee _Excludes scheduled maintenance_ | Month | $0.00
SLA w/ 99% Up-time Guarantee _Excludes scheduled maintenance_ | Month | Not Available
