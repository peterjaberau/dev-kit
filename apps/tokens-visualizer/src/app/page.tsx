"use client"
import { Container, SimpleGrid, HStack, Stack, Button, Text, GridItem, DataList } from '@chakra-ui/react'
import { Search } from "#components/Search"
import { searchSelector } from '#actors/selectors'

export default function Page() {

  const { searchQuery, searchResults } = searchSelector()

  return (
    <Container>
     <SimpleGrid columns={2}>
       <GridItem>
         <Search />
       </GridItem>

       <GridItem>
           <Stack gap="4">
             <DataList.Root size="sm">
               <DataList.Item>
                 <DataList.ItemLabel>searchQuery</DataList.ItemLabel>
                 <DataList.ItemValue>{searchQuery}</DataList.ItemValue>
               </DataList.Item>
             </DataList.Root>
             <DataList.Root size="md">
               <DataList.Item>
                 <DataList.ItemLabel>searchResults Count</DataList.ItemLabel>
                 <DataList.ItemValue>{searchResults.length}</DataList.ItemValue>
               </DataList.Item>
             </DataList.Root>
           </Stack>
       </GridItem>

     </SimpleGrid>
    </Container>
  )
}
