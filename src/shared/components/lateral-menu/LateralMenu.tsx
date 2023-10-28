import {
	Avatar,
	Divider,
	Drawer,
	Flex,
	ListItem,
	List,
	ListIcon,
	Text,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	Stack,
	useBreakpointValue
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export const LateralMenu = () => {

	const IS_SM_DOWN: boolean | undefined = useBreakpointValue({ base: true, sm: false });
	return (
		<>
			<Drawer
				isOpen={true}
				onClose={() => alert("vou fechar")}
				placement="left"
				isFullHeight
			>
				{/* <DrawerOverlay /> */}

				<DrawerContent>
					{/* <DrawerCloseButton /> */}
					<DrawerHeader>
						<Flex justifyContent={"center"} alignItems={"center"}>
							<Avatar
								src="https://github.com/Aristidescosta.png"
								name="Aristides da Costa"
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<Stack spacing={"24px"}>
							<Flex height={"full"} flexDir={"column"}>
								<Divider />

								<Flex flex={1}>
									<List spacing={3}>
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											<Text>Quidem</Text>
										</ListItem>
									</List>
								</Flex>
							</Flex>
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>

			<Flex h={"full"} ml={IS_SM_DOWN ? 0 : 360}>
				<Text>Isto é um teste</Text>
			</Flex>
		</>
	);
};
