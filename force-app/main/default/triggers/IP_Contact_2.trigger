trigger IP_Contact_2 on Contact (before insert, after update) 
{
    /*
      	Whenever Contact Address field is blank then add the related
		Account address into it.
    */ 
    Map<Id, List<Contact>> mapAccIdToContactLst = new Map<Id, List<Contact>>();
	for(Contact con: trigger.new)
    {
        if(con.Address__c == '')
        {
            if(mapAccIdToContactLst.get(con.AccountId) == null)
            {
                mapAccIdToContactLst.put(con.AccountId, new List<Contact>());
                mapAccIdToContactLst.get(con.AccountId).add(con);
            }
            else
            {
                mapAccIdToContactLst.get(con.AccountId).add(con);
            }    
        }    
    }// for
	for(Account acc: [SELECT Id,BillingCountry
                      FROM Account
                      WHERE Id IN :mapAccIdToContactLst.keySet()])
    {
        for(Contact c: mapAccIdToContactLst.get(acc.Id))
        {
            c.Address__c = acc.BillingCountry;
        }
    }
    if(trigger.isUpdate && trigger.isAfter)
    {
        /*
         	When you have a Map<T1, T2> and call values, 
			you get a List<T2>. So when you have a Map<T, List<T>>, 
			you get a List<List<T>>. Basically, 
			you're going to have to loop through if you want to flatten your map.
		*/
        if(!mapAccIdToContactLst.isEmpty())
            update flattenAndCopyList(mapAccIdToContactLst.values());
    }
	public static List<Contact> flattenAndCopyList(List<List<Contact>> nestedList)
    {
        List<Contact> flatList = new List<Contact>();
        for(List<Contact> lstContacts: nestedList)
        {
            flatList.addAll(lstContacts);
        }    
        return flatList.isEmpty() ? new List<Contact>() : flatList;
    }    
}