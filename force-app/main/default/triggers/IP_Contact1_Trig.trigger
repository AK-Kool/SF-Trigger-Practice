trigger IP_Contact1_Trig on Contact (after insert, after update) 
{
	// when ever the contact is added increase the count of contact in Account field.
	if(trigger.isInsert)
    {
		// contact ids
		// get Account ids
		Set<Id> accIds = new Set<Id>();
		for(Contact c: trigger.new)
        {
            if(c.AccountId != null)
            	accIds.add(c.AccountId);
        }
        List<Account> lstAccountToUpdate = new List<Account>();
        Integer i = 0;
        for(Account acc: [SELECT Name
                          FROM Account
                          WHERE Id IN :accIds])
        {
            acc.Name += ' Update ' + i;
            lstAccountToUpdate.add(acc);
        }
        if(!lstAccountToUpdate.isEmpty())
            update lstAccountToUpdate;
        
        for(Account acc2: [SELECT Name, (SELECT Name FROM Contacts)
                           FROM Account
                           WHERE Id IN :accIds])
        {
            System.debug(acc2.Contacts);
            for(Contact c : acc2.Contacts)
            {
                System.debug(c.Name);
            }
        }    
    }
    else if(trigger.isUpdate)
    {
        
    }
}