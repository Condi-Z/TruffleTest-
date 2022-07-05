// A passA: 0xed41DbfC81d1Aaf1693ace6717a06FB9c6129F3c(Manufacturer制造商)
// B passB: 0xEf1Eb83f67f667f4E869d2B8E9fc5aC8e696A1fc(Manufacturer制造商)
// C passC: 0x33857878A403Ec7e15E684e561CF63178d25a18b(Supplier 供应商)
// D: 0x31317A963f91F5Cb027f11aEdebe56c1055A1c2F(Supplier 供应商)
// E: 0xE97B9F2b775bdcc1838A504C9FcEb26de1A365eA(Supplier 供应商)
// F: 0x742B0075F01Bc5D130983D5845b962FE3Afa35A0(Supplier 供应商)
// G: 0xbb677F50Ae8a53eADfd862465D0395416E872215(Consumer 消费者)
// H: 0x72F31dD589e01B6b30421b34A45Ba24A8a7cb201(Consumer 消费者)


var SupplyChain = artifacts.require("./SupplyChain.sol");
contract('SupplyChain', async  => {
    it("创建2个制造商", async () => {
        let instance = await SupplyChain.deployed();
        let participantId1 = await instance.addParticipant("A", "passA", "0xed41DbfC81d1Aaf1693ace6717a06FB9c6129F3c", "Manufacturer");
        let participant1 = await instance.participants(0);
        assert.equal(participant1[0], "A");
        assert.equal(participant1[2], "Manufacturer");

        let participantId2 = await instance.addParticipant("B", "passB", "0xEf1Eb83f67f667f4E869d2B8E9fc5aC8e696A1fc", "Manufacturer");
        let participant2 = await instance.participants(1);
        assert.equal(participant2[0], "B");
        assert.equal(participant2[2], "Manufacturer");

    });

    it("创建4个供应商", async () => {
        let instance = await SupplyChain.deployed();
        let participantId3 = await instance.addParticipant("C", "passC", "0x33857878A403Ec7e15E684e561CF63178d25a18b", "Supplier");
        let participant3 = await instance.participants(2);
        assert.equal(participant3[0], "C");
        assert.equal(participant3[2], "Supplier");

        let participantId4 = await instance.addParticipant("D", "passD", "0x31317A963f91F5Cb027f11aEdebe56c1055A1c2F", "Supplier");
        let participant4 = await instance.participants(3);
        assert.equal(participant4[0], "D");
        assert.equal(participant4[2], "Supplier");
        
        let participantId5 = await instance.addParticipant("E", "passE", "0xE97B9F2b775bdcc1838A504C9FcEb26de1A365eA", "Supplier");
        let participant5 = await instance.participants(4);
        assert.equal(participant5[0], "E");
        assert.equal(participant5[2], "Supplier");
        
        let participantId6 = await instance.addParticipant("F", "passF", "0x742B0075F01Bc5D130983D5845b962FE3Afa35A0", "Supplier");
        let participant6 = await instance.participants(5);
        assert.equal(participant6[0], "F");
        assert.equal(participant6[2], "Supplier");

    });

    it("创建2个消费者", async () => {
        let instance = await SupplyChain.deployed();
        let participantId7 = await instance.addParticipant("G", "passG", "0xbb677F50Ae8a53eADfd862465D0395416E872215", "Consumer");
        let participant7 = await instance.participants(6);
        assert.equal(participant7[0], "G");
        assert.equal(participant7[2], "Consumer");

        let participantId8 = await instance.addParticipant("H", "passH", "0x72F31dD589e01B6b30421b34A45Ba24A8a7cb201", "Consumer");
        let participant8 = await instance.participants(7);
        assert.equal(participant8[0], "H");
        assert.equal(participant8[2], "Consumer");

    });

    it("新建2个商品", async () => {
        let instance = await SupplyChain.deployed();
        let prodId1 = await instance.addProduct(0, "钟智祺1", "100", "123", 11);
        let prod1 = await instance.getProduct(0);
        assert.equal(prod1[0], "钟智祺1", "==>"+prod1[0].modelNumber);

        let prodId2 = await instance.addProduct(1, "钟智祺2", "100", "123", 12);
        let prod2 = await instance.getProduct(1);
        assert.equal(prod2[0], "钟智祺2", "==>"+prod2[0].modelNumber);
    });

    it("制造商==>供应商", async () => {
        let instance = await SupplyChain.deployed();

        await instance.newOwner(0, 2, 0);
        let _getOwnership = await instance.getOwnership(0)
        console.log("_getOwnership", _getOwnership[2]);
        assert.equal("0x33857878A403Ec7e15E684e561CF63178d25a18b", _getOwnership[2]);
    })


    it("供应商==>供应商", async () => {
    let instance = await SupplyChain.deployed();

    await instance.newOwner(2, 3, 0, { from:"0x33857878A403Ec7e15E684e561CF63178d25a18b" });
    _getOwnership1 = await instance.getOwnership(1)
    console.log("_getOwnership", _getOwnership1[2]);
    assert.equal("0x31317A963f91F5Cb027f11aEdebe56c1055A1c2F", _getOwnership1[2]);

    })

    it("供应商==>消费者", async () => {
        let instance = await SupplyChain.deployed();

        await instance.newOwner(3, 6, 0, { from:"0x31317A963f91F5Cb027f11aEdebe56c1055A1c2F" });
        let _getOwnership = await instance.getOwnership(2)
        console.log("_getOwnership", _getOwnership[2]);
        assert.equal("0xbb677F50Ae8a53eADfd862465D0395416E872215", _getOwnership[2]);
    })

    it("制造商==>消费者", async () => {
        let instance = await SupplyChain.deployed();

        await instance.newOwner(1, 7, 1, { from:"0xEf1Eb83f67f667f4E869d2B8E9fc5aC8e696A1fc" });
        let _getOwnership = await instance.getOwnership(3)
        console.log("_getOwnership", _getOwnership[2]);
        assert.equal("0x72F31dD589e01B6b30421b34A45Ba24A8a7cb201", _getOwnership[2]);
    })

})