This solution file was completed in approximately 1 hour.

Due to time constraints, there are no testing, commenting nor refactoring (so the whole thing
looks like a mess and lots of redundant code, no regards for extensibility as everything is
hardcoded),

The solution is definitely not perfect since it only tries to group orders that have their
weight add up to 5. If the weights do not add up to 5, the program will just group them up
individually leading to some unused weight for particular vans. However, when scaled up, the
amount of vans that do not have their weight optimized due to this solution is going to be very
small. Since to get to the part where the program groups the orders individually (ie. only orders
of weight 1, or of weight 2, etc), the number of orders has been reduced greatly.

Additionally, some thought was given to maybe instead of grouping orders of different customers
into groups of weight 5 (the second big loop), we can instead just group the leftover orders
for each customer into 1 van. However, as the number of customers that don't have their order's
weights add up to 5 increases, this is going to be more inefficient in space than comparison 
to this solution.

